const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// Middleware for input validation for creating/updating a schedule
const scheduleValidation = [
    body('schedule_name').notEmpty().withMessage('Schedule name is required'),
    body('round').notEmpty().withMessage('Round is required'),
    body('date_time').isDate().withMessage('Date and time must be a valid datetime'),
    body('register_id').isInt().withMessage('Register ID must be a valid integer')
];
/**
 * @swagger
 * /schedule:
 *   post:
 *     tags:
 *       - Schedule
 *     description: Creates a new schedule
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: schedule
 *         description: Schedule object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Schedule'
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *            application/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseSchedule'
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
router.post('/', scheduleValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const conn = await pool.getConnection();
        await conn.query("INSERT INTO Schedule (schedule_name, round, date_time, register_id) VALUES (?, ?, ?, ?)", 
        [req.body.schedule_name, req.body.round, req.body.date_time, req.body.register_id]);
        res.status(201).send({message:'Schedule created successfully!'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});

router.get('/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const schedules = await conn.query("SELECT * FROM Schedule");
        res.json({data:schedules});
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const schedule = await conn.query("SELECT * FROM Schedule WHERE schedule_id = ?", [req.params.id]);
        if (schedule.length > 0) {
            res.json({data:schedule[0]});
        } else {
            res.status(404).send({message:'Schedule not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});

router.put('/:id', scheduleValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE Schedule SET schedule_name = ?, round = ?, date_time = ?, register_id = ? WHERE schedule_id = ?", 
        [req.body.schedule_name, req.body.round, req.body.date_time, req.body.register_id, req.params.id]);
        if (result.affectedRows > 0) {
            res.send({message:'Schedule updated successfully!'});
        } else {
            res.status(404).send({message:'Schedule not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Schedule WHERE schedule_id = ?", [req.params.id]);
        if (result.affectedRows > 0) {
            res.send({message:'Schedule deleted successfully!'});
        } else {
            res.status(404).send({message:'Schedule not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({message:'Server error'});
    }
});
/**
 * @swagger
 * definitions:
 *   Schedule:
 *     properties:
 *       schedule_id:
 *         type: integer
 *       schedule_name:
 *         type: string
 *       round:
 *         type: string
 *       date_time:
 *         type: string
 *       format: date-time
 *       register_id:
 *         type: integer
 *   ResponseSchedule:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/Schedule'
 *   ResponseError:
 *      properties:
 *          message:
 *              type: string
 */
module.exports = router;
