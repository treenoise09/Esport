const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// Middleware for input validation for creating/updating a tournament
const tournamentValidation = [
    body('tour_name').isLength({ min: 3 }).withMessage('Tournament name must be at least 3 characters long'),
    body('tour_detail').isLength({ min: 10 }).withMessage('Tournament detail must be at least 10 characters long'),
    body('start_date').optional().isDate().withMessage('Start date must be a valid date'),
    body('end_date').optional().isDate().withMessage('End date must be a valid date')
];

/**
 * @swagger
 * /tournaments:
 *   post:
 *     tags:
 *       - Tournament
 *     description: Create a new tournament
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tournament
 *         description: Tournament object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tournament'
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         schema:
 *           $ref: '#/definitions/ResponseTournament'
 *       400:
 *         description: Invalid input
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 */
router.post('/', tournamentValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const conn = await pool.getConnection();
        await conn.query("INSERT INTO Tournament (tour_name, tour_detail, start_date, end_date) VALUES (?, ?, ?, ?)", 
        [req.body.tour_name, req.body.tour_detail, req.body.start_date, req.body.end_date]);
        res.status(201).send({message:'Tournament created successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});

    }
});

/**
 * @swagger
 * /tournaments:
 *   get:
 *     tags:
 *       - Tournament
 *     description: Get all tournaments
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of tournaments
 *         schema:
 *           $ref: '#/definitions/ResponseTournaments'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const tournaments = await conn.query("SELECT * FROM Tournament");
        res.json({data:tournaments});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});

    }
});

/**
 * @swagger
 * /tournaments/{tournaments_id}:
 *   get:
 *     tags:
 *       - Tournament
 *     description: Get a specific tournament by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tournaments_id
 *         description: ID of the tournament to retrieve
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single tournament
 *         schema:
 *           $ref: '#/definitions/ResponseTournament'
 *       404:
 *         description: Tournament not found
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 */
router.get('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const tournament = await conn.query("SELECT * FROM Tournament WHERE tour_id = ?", [req.params.id]);
        if (tournament.length > 0) {
            res.json({data:tournament[0]});
        } else {
            res.status(404).send({message:'Tournament not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});

    }
});

/**
 * @swagger
 * /tournaments/{tournaments_id}:
 *   put:
 *     tags:
 *       - Tournament
 *     description: Update a tournament by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tournaments_id
 *         description: ID of the tournament to update
 *         in: path
 *         required: true
 *         type: integer
 *       - name: tournament
 *         description: Tournament object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tournament'
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *         schema:
 *           $ref: '#/definitions/ResponseTournament'
 *       404:
 *         description: Tournament not found
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 */
router.put('/:id', tournamentValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE Tournament SET tour_name = ?, tour_detail = ?, start_date = ?, end_date = ? WHERE tour_id = ?", 
        [req.body.tour_name, req.body.tour_detail, req.body.start_date, req.body.end_date, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({message:'Tournament updated successfully!'});
        } else {
            res.status(404).send({message:'Tournament not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});

    }
});

/**
 * @swagger
 * /tournaments/{tournaments_id}:
 *   delete:
 *     tags:
 *       - Tournament
 *     description: Delete a tournament by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tournaments_id
 *         description: ID of the tournament to delete
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *         schema:
 *           $ref: '#/definitions/ResponseTournament'
 *       404:
 *         description: Tournament not found
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ResponseError'
 */
router.delete('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Tournament WHERE tour_id = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.send({message:'Tournament deleted successfully!'});
        } else {
            res.status(404).send({message:'Tournament not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});

    }
});

/**
 * @swagger
 * definitions:
 *   Tournament:
 *     properties:
 *       tour_id:
 *         type: integer
 *       tour_name:
 *         type: string
 *       tour_detail:
 *         type: string
 *       start_date:
 *         type: string
 *         format: date
 *       end_date:
 *         type: string
 *         format: date
 *   ResponseTournament:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/Tournament'
 *   ResponseTournaments:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Tournament'
 *   ResponseError:
 *      properties:
 *          message:
 *              type: string
 */
module.exports = router;