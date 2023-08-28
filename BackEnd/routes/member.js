const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * /members/register:
 *   post:
 *     tags:
 *       - Member Register
 *     description: Creates a new member
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: member
 *         description: Member object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RegisterMember'
 *     responses:
 *       201:
 *         description: User registered successfully!
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       400:
 *         description: Invalid request body
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
    body('aka').notEmpty().withMessage('AKA is required'),
    body('role').isIn(['USER', 'ADMIN']).withMessage('Role must be either USER or ADMIN'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const conn = await pool.getConnection();
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await conn.query("INSERT INTO Member (username, password, name, aka, role, team_id) VALUES (?, ?, ?, ?, ?, ?)", 
        [req.body.username, hashedPassword, req.body.name, req.body.aka, req.body.role, req.body.team_id]);
        res.status(201).send({message:'User registered successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }finally {
        if (conn) conn.release();  // Ensure connection is released
    }
});

/**
 * @swagger
 * /members/login:
 *   post:
 *     tags:
 *       - Member Login
 *     description: Creates a new member
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: member
 *         description: Member object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LoginMember'
 *     responses:
 *       200:
 *         description: Login successful!
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseMember'
 *       500:
 *         description: Server error
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       401:
 *         description: Incorrect password
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       404:
 *         description: User not found
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.post('/login', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const result = await conn.query("SELECT * FROM Member WHERE username = ?", [req.body.username]);
        if (result.length > 0) {
            const user = result[0];
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send({message:'Login successful!',data:user});
                // Here, you'd typically issue a token or start a session
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }finally {
        if (conn) conn.release();  // Ensure connection is released
    }
});

router.get('/', async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const members = await conn.query("SELECT Member.*,image_table.* FROM Member LEFT JOIN image_table ON Member.member_id = image_table.tableId AND image_table.tableName = 'member'");
        res.json({data: members});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }finally {
        if (conn) conn.release();  // Ensure connection is released
    }
});

router.get('/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {

        const member = await conn.query("SELECT Member.*,image_table.* FROM Member LEFT JOIN image_table ON Member.member_id = image_table.tableId AND image_table.tableName = 'member' WHERE Member.member_id = ? ", [req.params.id]);
        if (member.length > 0) {
            res.json(member[0]);
        } else {
            res.status(404).send({message: 'Member not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }finally {
        if (conn) conn.release();  // Ensure connection is released
    }
});

router.put('/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {

        await conn.query("UPDATE Member SET username = ?, name = ?, aka = ?, role = ?, team_id = ? WHERE member_id = ?", 
        [req.body.username, req.body.name, req.body.aka, req.body.role, req.body.team_id, req.params.id]);
        res.send({message: 'Member updated successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }finally {
        if (conn) conn.release();  // Ensure connection is released
    }
});

router.delete('/:id', async (req, res) => {
    const conn = await pool.getConnection();
    try {

        await conn.query("DELETE FROM Member WHERE member_id = ?", [req.params.id]);
        res.send({message: 'Member deleted successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }finally {
        if (conn) conn.release();  // Ensure connection is released
    }
});


/**
 * @swagger
 * definitions:
 *   Member:
 *     properties:
 *       member_id:
 *         type: integer
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       name:
 *         type: string
 *       age:
 *         type: integer
 *       aka:
 *         type: string
 *       is_admin:
 *         type: boolean
 *       team_id:
 *         type: integer
 *   RegisterMember:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       name:
 *         type: string
 *       age:
 *         type: integer
 *       aka:
 *         type: string
 *       is_admin:
 *         type: boolean
 *       team_id:
 *         type: integer
 *   LoginMember:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *   ResponseMember:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/Member'
 *   ResponseError:
 *     properties:
 *       message:
 *         type: string
 *       error:
 *         type: string
 */
module.exports = router;