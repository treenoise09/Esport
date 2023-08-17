const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Member
 *     description: Creates a new member
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: member
 *         description: Member object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Member'
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
    body('date_of_birth').isDate().withMessage('Date of birth must be a valid date'),
    body('aka').notEmpty().withMessage('AKA is required'),
    body('role').isIn(['USER', 'ADMIN']).withMessage('Role must be either USER or ADMIN'),
    body('email').isEmail().normalizeEmail().withMessage('Email must be valid'),
    body('team_id').optional().isInt().withMessage('Team ID must be a valid integer'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const conn = await pool.getConnection();
        await conn.query("INSERT INTO Member (username, password, name, date_of_birth, aka, role, email, team_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
        [req.body.username, hashedPassword, req.body.name, req.body.date_of_birth, req.body.aka, req.body.role, req.body.email, req.body.team_id]);
        res.status(201).send({message:'User registered successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Member
 *     description: Creates a new member
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: member
 *         description: Member object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Member'
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
    try {
        const conn = await pool.getConnection();
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