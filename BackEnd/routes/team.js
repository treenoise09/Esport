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
    body('team_name').notEmpty().withMessage('Team name is required')
], async (req,res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("INSERT INTO Team (team_name) VALUES (?)",[req.body.teamName])
        res.status(201).send({message:'Team created successfully',data:result})
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
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
    try {
        const conn = await pool.getConnection();
        const results = await conn.query("SELECT * FROM Team");
        res.send({ message: "All teams", data: results });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
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
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM Team WHERE team_id = ?",[req.params.id])
        //Check if result is empty return 404 status code and message
        if (!result || !Array.isArray(result) || result.length === 0){
            res.status(404).send({message:"Team not found"})
        };
        res.status(200).send({message:`Team ${req.params.id}`,data:result})
        
        
        
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
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
router.put('/:id', [
    body('team_name').notEmpty().withMessage('Team name is required')
], async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE Team SET team_name = ? WHERE team_id = ?", [req.body.team_name, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Team updated successfully!" });
        } else {
            res.status(404).send({ message: "Team not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
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
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Team WHERE team_id = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.send({ message: "Team deleted successfully!" });
        } else {
            res.status(404).send({ message: "Team not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
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