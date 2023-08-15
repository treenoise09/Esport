const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// Create Team
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

// Get Team
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
module.exports = router