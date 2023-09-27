const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * /teams:
 *   post:
 *     tags:
 *       - Team
 *     description: Create a team
 *     parameters:
 *       - name: team
 *         description: team object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Team'
 *     responses:
 *       201:
 *         description: Team created
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseTeam'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.post('/',[
    body('team_name').notEmpty().withMessage('Team name is required'),
    body('members').isArray().withMessage('Members should be an array')
], async (req,res) => {
    const errors = validationResult(req);
    const conn = await pool.getConnection();
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        
        await conn.beginTransaction();

        // Insert team
        const result = await conn.query("INSERT INTO Team (team_name, team_lead) VALUES (?,?)", [req.body.team_name,req.body.team_lead]);
        const teamId = result.insertId;

        // Update members
        for (const username of req.body.members) {
           
            const user = await conn.query("SELECT * FROM Member WHERE username = ?", [username]);
            if (user.length === 0) {
                await conn.rollback();
                return res.status(400).send({message: `Username ${username} not found`});
            }
            await conn.query("UPDATE Member SET team_id = ? WHERE username = ?", [teamId, username]);
        }

        await conn.commit();

        res.status(201).send({message:'Team and members created successfully'});
    } catch (error) {
        await conn.rollback();
        console.error(error);
        res.status(500).send({message:'Server error'});
    } finally {
        conn.release();
    }
})
/**
 * @swagger
 * /team:
 *   get:
 *     tags:
 *       - Team
 *     description: Get all teams
 *     responses:
 *       200:
 *         description: An array of teams
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseTeams'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get('/', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        
        const results = await conn.query("SELECT * FROM Team");
        res.send({ message: "All teams", data: results });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }finally {
        conn.release();
    }
});

/**
 * @swagger
 * /teams/{team_id}:
 *   get:
 *     tags:
 *       - Team
 *     description: Get a team
 *     parameters:
 *       - name: id
 *         description: ID of the team to retrive
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Team fetched
 *         content:
 *            applicatino/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseTeam'
 *       404:
 *         description: Team not found
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get('/:id',async (req,res) => {
    const conn = await pool.getConnection();
    try {
        
        const result = await conn.query("SELECT * FROM Team WHERE team_id = ?",[req.params.id])
        const members = await conn.query("SELECT * FROM Member WHERE team_id = ?",[req.params.id])
        //Check if result is empty return 404 status code and message
        if (!result || !Array.isArray(result) || result.length === 0){
            res.status(404).send({message:"Team not found"})
        };
        const team = result[0]
        res.status(200).send({message:`Team ${req.params.id}`,data:{result:team,members}})
        
        
        
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }finally {
        conn.release();
    }
})

/**
 * @swagger
 * /teams/{team_id}:
 *   put:
 *     tags:
 *       - Team
 *     description: Delete a team
 *     parameters:
 *       - name: id
 *         description: ID of the team to delete
 *         in: path
 *         required: true
 *         type: integer
 *       - name: team
 *         description: team object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Team'
 *     responses:
 *       200:
 *         description: Team updated
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       404:
 *         description: Team not found
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.put('/:id',[],async (req,res,next) => {
    if(req.query.type !== 'addTeamMember') return next()
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        for (const username of req.body.members) {
           
            const user = await conn.query("SELECT * FROM Member WHERE username = ?", [username]);
            if (user.length === 0) {
                await conn.rollback();
                return res.status(404).send({message: `Username ${username} not found`});
            }
            if ( user[0].team_id === req.params.id){
                await conn.rollback();
                return res.status(400).send({message:`This username ${username} already in this team`})
            }
            if ( user[0].team_id !== req.params.id && user[0].team_id !== null){
                await conn.rollback();
                return res.status(400).send({message:`This username ${username} already in the team`})
            }
            await conn.query("UPDATE Member SET team_id = ? WHERE username = ?", [req.params.id, username]);
        }
    
        await conn.commit();
        res.status(201).send({message:'Members added successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }finally {
        conn.release();
    }

})

router.put('/:id', [
], async (req, res,next) => {
    if(req.query.type !== 'updateTeamLead') return next()
    const conn = await pool.getConnection();
    try {
        const result = await conn.query("UPDATE Team SET team_lead = ? WHERE team_id = ?", [req.body.team_lead, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Team updated successfully!" });
        } else {
            res.status(404).send({ message: "Team not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }finally {
        conn.release();
    }
});
router.put('/:id', [
], async (req, res,next) => {
    if(req.query.type !== 'removeMember') return next()
    const conn = await pool.getConnection();
    try {
        const result = await conn.query("UPDATE Member SET team_id = NULL WHERE team_id = ? and member_id = ?", [req.params.id,req.body.memeber_id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Team updated successfully!" });
        } else {
            res.status(404).send({ message: "Member not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }finally {
        conn.release();
    }
});

router.put('/:id', [
    body('team_name').notEmpty().withMessage('Team name is required')
], async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.query("UPDATE Team SET team_name = ? WHERE team_id = ?", [req.body.team_name, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Team updated successfully!" });
        } else {
            res.status(404).send({ message: "Team not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }finally {
        conn.release();
    }
});

/**
 * @swagger
 * /teams/{team_id}:
 *   delete:
 *     tags:
 *       - Team
 *     description: Update a team
 *     parameters:
 *       - name: id
 *         description: ID of the team to update
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Team updated
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       404:
 *         description: Team not found
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.delete('/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        
        const result = await conn.query("DELETE FROM Team WHERE team_id = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Team deleted successfully!" });
        } else {
            res.status(404).send({ message: "Team not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }finally {
        conn.release();
    }
});



/**
 * @swagger
 * definitions:
 *   Team:
 *     properties:
 *       team_id:
 *         type: integer
 *       team_name:
 *         type: string
 *   ResponseTeam:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/Team'
 *   ResponseTeams:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Team'
 *   ResponseError:
 *      properties:
 *          message:
 *              type: string
 */
module.exports = router