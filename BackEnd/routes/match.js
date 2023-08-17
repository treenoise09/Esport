const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// Middleware for input validation for creating/updating a match
const matchValidation = [
    body('result').notEmpty().withMessage('Result is required'),
    body('score').notEmpty().withMessage('Score is required'),
    body('schedule_id').isInt().withMessage('Schedule ID must be a valid integer')
];
/**
 * @swagger
 * /matches:
 *   post:
 *     tags:
 *       - Match
 *     description: Creates a new match
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: match
 *         description: Match object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Match'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseMatch'
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
router.post('/', matchValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const conn = await pool.getConnection();
        await conn.query("INSERT INTO Match_db (result, score, schedule_id) VALUES (?, ?, ?)", 
        [req.body.result, req.body.score, req.body.schedule_id]);
        res.status(201).send({message:'Match created successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});
/**
 * @swagger
 * /matches:
 *   get:
 *     tags:
 *       - Match
 *     description: Get all matches
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved list of matches
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/Match'
 *       500:
 *         description: Server error
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get('/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const matches = await conn.query("SELECT * FROM Match_db");
        res.json({data:matches});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});
/**
 * @swagger
 * /matches/{match_id}:
 *   get:
 *     tags:
 *       - Match
 *     description: Get a specific match by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: match_id
 *         description: ID of the match to retrieve
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved match
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/Match'
 *       404:
 *         description: Match not found
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const match = await conn.query("SELECT * FROM Match_db WHERE match_id = ?", [req.params.id]);
        if (match.length > 0) {
            res.json(match[0]);
        } else {
            res.status(404).send({message:'Match not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});
/**
 * @swagger
 * /matches/{match_id}:
 *   put:
 *     tags:
 *       - Match
 *     description: Update a specific match by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: match_id
 *         description: ID of the match to update
 *         in: path
 *         required: true
 *         type: integer
 *       - name: match
 *         description: Match object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Match'
 *     responses:
 *       200:
 *         description: Successfully updated match
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseMatch'
 *       404:
 *         description: Match not found
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */

router.put('/:id', matchValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE Match_db SET result = ?, score = ?, schedule_id = ? WHERE match_id = ?", 
        [req.body.result, req.body.score, req.body.schedule_id, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({message:'Match updated successfully!'});
        } else {
            res.status(404).send({message:'Match not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});
/**
 * @swagger
 * /matches/{match_id}:
 *   delete:
 *     tags:
 *       - Match
 *     description: Delete a specific match by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: match_id
 *         description: ID of the match to delete
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted match
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseMatch'
 *       404:
 *         description: Match not found
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.delete('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Match_db WHERE match_id = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.send({message:'Match deleted successfully!'});
        } else {
            res.status(404).send({message:'Match not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});
/**
 * @swagger
 * definitions:
 *   Match:
 *     properties:
 *       match_id:
 *         type: integer
 *       result:
 *         type: string
 *       score:
 *         type: string
 *       schedule_id:
 *         type: integer
 *   ResponseMatch:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/Match'
 *   ResponseMatches:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Match'
 *   ResponseError:
 *      properties:
 *          message:
 *              type: string
 */
module.exports = router;
