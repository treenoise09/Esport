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

// Create a new tournament
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

// Get all tournaments
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

// Get a specific tournament by ID
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

// Update a tournament by ID
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

// Delete a tournament by ID
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

module.exports = router;