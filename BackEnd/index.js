const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const multer = require("multer");
const path = require("path");

const member = require("./routes/member");
const team = require("./routes/team");
const tournament = require("./routes/tournamets");
const match = require("./routes/match");
const schedule = require("./routes/schedule");
const register = require("./routes/register");
const pool = require("./db");

const app = express();
const port = 4000;
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const options = {
  definition: {
    openapi: "3.0.2",
    info: {
      title: "eSport Tournament API",
      version: "1.0.0",
      description: "API documentation for the eSport Tournament application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

const specs = swaggerJsdoc(options);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/members", member);
app.use("/teams", team);
app.use("/tournaments", tournament);
app.use("/matches", match);
app.use("/schedules", schedule);
app.use("/register", register);
app.post("/image", upload.single("image"), async (req, res) => {
  const imageUrl = `http://localhost:4000/image/${req.file.filename}`; // Replace with your actual server URL
  const { id, tableName } = req.query;

  const sql = `
    INSERT INTO image_table (img_name, image, tableId, tableName) 
    VALUES (?, ?, ?, ?) 
    ON DUPLICATE KEY UPDATE img_name = VALUES(img_name), image = VALUES(image)
  `;

  try {
    const conn = await pool.getConnection();
    await conn.query(sql, [req.file.filename, imageUrl, id, tableName]);
    conn.release();
    res.json({ message: "Image uploaded and database updated", imageUrl });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to insert into database" });
  }
});

app.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;

  // Add your logic here (e.g., authentication)

  res.sendFile(path.join(__dirname, `./uploads/${imageName}`));
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
