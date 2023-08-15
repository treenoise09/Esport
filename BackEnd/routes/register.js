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
 *       200:
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

  try {
    const conn = await pool.getConnection();
    await conn.query("INSERT INTO Register (team_id, tour_id) VALUES (?, ?)", [
      req.body.team_id,
      req.body.tour_id,
    ]);
    res.status(201).send({ message: "Registration created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
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
 *                      type: array
 *                      items:
 *                          $ref: '#/definitions/ResponseRegister'
 *       500:
 *         description: Server error
 *         content:
 *              applicatino/json:
 *                  schema:
 *                      $ref: '#/definitions/ResponseError'
 */
router.get("/", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const registrations = await conn.query("SELECT * FROM Register");
    res.json({ data: registrations });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
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
  try {
    const conn = await pool.getConnection();
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
  }
});

/**
 * @swagger
 * /register/{register_id}:
 *   put:
 *     tags:
 *       - Register
 *     description: Update a specific register by ID
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

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      "UPDATE Register SET team_id = ?, tour_id = ? WHERE register_id = ?",
      [req.body.team_id, req.body.tour_id, req.params.id]
    );
    if (result.affectedRows > 0) {
      res.send({ message: "Registration updated successfully!" });
    } else {
      res.status(404).send({ message: "Registration not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

/**
 * @swagger
 * /register/{register_id}:
 *   delete:
 *     tags:
 *       - Register
 *     description: Delete a specific register by ID
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
  try {
    const conn = await pool.getConnection();
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
 *   ResponseError:
 *      properties:
 *          message:
 *              type: string
 */

module.exports = router;
