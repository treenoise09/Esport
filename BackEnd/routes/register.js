const express = require("express");
const { body, validationResult } = require("express-validator");
const pool = require("../db");

const router = express.Router();

// Middleware for input validation for creating/updating a registration
const registerValidation = [
  body("team_id").isInt().withMessage("Team ID must be a valid integer"),
  body("tour_id").isInt().withMessage("Tournament ID must be a valid integer"),
];

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Register
 *     description: Creates a new registration
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: registration
 *         description: Registration object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *            applicatino/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseRegister'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       400:
 *         description: Invalid request body
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.post("/", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const conn = await pool.getConnection();
  try {
    const register_count = await conn.query("SELECT COUNT(tour_id) as count FROM Register WHERE Register.tour_id = ? ",[req.body.tour_id])
    console.log(register_count)
    if(register_count[0].count >= 16){
      res.status(403).send({message: "Can not register this tournament. Team is full."})
      throw new Error("Team is full")
    }
    await conn.query("INSERT INTO Register (team_id, tour_id) VALUES (?, ?)", [
      req.body.team_id,
      req.body.tour_id,
    ]);
    res.status(201).send({ message: "Registration created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});

/**
 * @swagger
 * /register:
 *   get:
 *     tags:
 *       - Register
 *     description: Get all registrations
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all registers
 *         content:
 *            applicatino/json:
 *                 schema:
 *                    $ref: '#/definitions/ResponseRegisters'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get("/", async (req, res) => {
  const conn = await pool.getConnection();
  const { tour_id } = req.query;
  try {
    let registrations;
    if (tour_id) {
      registrations = await conn.query(
        `
      SELECT Register.*, Team.team_name, Schedule.date_time, Schedule.location
      FROM Register
      JOIN Team ON Register.team_id = Team.team_id
      LEFT JOIN Schedule ON Register.register_id = Schedule.register_id
      WHERE Register.tour_id = ?;
    `,
        [tour_id]
      );
    } else {
      registrations = await conn.query("SELECT * FROM Register");
    }
    res.json({ data: registrations });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});

/**
 * @swagger
 * /register/{register_id}:
 *   get:
 *     tags:
 *       - Register
 *     description: Get a specific registration by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: register_id
 *         description: ID of the registration to retrieve
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A register found
 *         content:
 *            applicatino/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseRegister'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       404:
 *         description: Register not found
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get("/:id", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const registration = await conn.query(
      "SELECT * FROM Register WHERE register_id = ?",
      [req.params.id]
    );
    if (registration.length > 0) {
      res.json({ data: registration[0] });
    } else {
      res.status(404).send({ message: "Registration not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});

/**
 * @swagger
 * /register/{register_id}:
 *   put:
 *     tags:
 *       - Register
 *     description: Update a specific register by ID
 *     parameters:
 *       - name: register_id
 *         description: ID of the registration to update
 *         in: path
 *         required: true
 *         type: integer
 *       - name: registration
 *         description: Registration object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *            applicatino/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseError'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       404:
 *         description: Register not found
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 *       400:
 *         description: Invalid request body
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.put("/:id", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const conn = await pool.getConnection();

  try {
    const result = await conn.query(
      "UPDATE Register SET Register.team_id = ?, Register.tour_id = ?,Register.status = ?, Register.round = ?,Register.index = ?  WHERE Register.register_id = ?",
      [
        req.body.team_id,
        req.body.tour_id,
        req.body.status,
        req.body.round,
        req.body.index,
        req.params.id,
      ]
    );
    if (result.affectedRows > 0) {
      if (req.body.status === 'Winner'){
        await conn.query("UPDATE Tournament SET status = 'END' WHERE tour_id = ?",[req.body.tour_id])
        res.send({ message: "Registration updated successfully!" });
      }
    } else {
      res.status(404).send({ message: "Registration not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});

/**
 * @swagger
 * /register/bulk:
 *   put:
 *     tags:
 *       - Register
 *     description: Bulk update registrations
 *     parameters:
 *       - name: registrations
 *         description: Array of registration objects to update
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Register'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully updated
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
 */
router.put("/bulk/update", async (req, res) => {
  console.log("Get in");
  const conn = await pool.getConnection();
  try {
    const registrations = req.body;
    console.log(registrations)
    // Start a transaction
    await conn.beginTransaction();

    for (const registration of registrations) {
      await conn.query(
        "UPDATE Register SET Register.status = ?, Register.position = ?, Register.index = ? WHERE Register.register_id = ?",
        [
          registration.status,
          registration.position,
          registration.index,
          registration.register_id,
        ]
      );
    }

    // Commit the transaction
    await conn.commit();

    res.status(200).send({ message: "Bulk update successful!" });
  } catch (error) {
    // Rollback the transaction in case of an error
    await conn.rollback();
    console.error(error);
    res.status(500).send({ message: "Server error" });
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});

/**
 * @swagger
 * /register/{register_id}:
 *   delete:
 *     tags:
 *       - Register
 *     description: Delete a specific register by ID
 *     parameters:
 *       - name: register_id
 *         description: ID of the registration to delete
 *         in: path
 *         required: true
 *         type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         content:
 *            applicatino/json:
 *                 schema:
 *                     $ref: '#/definitions/ResponseError'
 *       404:
 *         description: Register not found
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
router.delete("/:id", async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      "DELETE FROM Register WHERE register_id = ?",
      [req.params.id]
    );
    if (result.affectedRows > 0) {
      res.send({ message: "Registration deleted successfully!" });
    } else {
      res.status(404).send({ message: "Registration not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
});
/**
 * @swagger
 * definitions:
 *   Register:
 *     properties:
 *       register_id:
 *         type: integer
 *       team_id:
 *         type: integer
 *       tour_id:
 *         type: integer
 *   ResponseRegister:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *         $ref: '#/definitions/Register'
 *   ResponseRegisters:
 *     properties:
 *       message:
 *         type: string
 *       data:
 *          type: array
 *          items:
 *              $ref: '#/definitions/Register'
 *   ResponseError:
 *      properties:
 *          message:
 *              type: string
 */

module.exports = router;
