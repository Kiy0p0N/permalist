import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// PostgreSQL database client configuration
const db = new pg.Client({
  user: "postgres", // Database username
  host: "localhost", // Database host (local development)
  database: "permalist", // Target database name
  password: "hades", // Database password (avoid hardcoding credentials in production)
  port: 5432 // Default PostgreSQL port
});

// Establish connection to the PostgreSQL database
try {
  db.connect(); // Connect to the database
  console.log("Connected to the database successfully.");
} catch (err) {
  console.error("Database connection error:", err);
}

// Middleware to parse URL-encoded data from form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files (CSS, images, client-side JS) from the 'public' directory
app.use(express.static("public"));

// Render the main page with the current list items
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items"); // Fetch all items from the database
    res.render("index.ejs", {
      listTitle: "Today", // Static list title
      listItems: result.rows, // Pass retrieved items to the template
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Internal Server Error"); // Handle potential query failures
  }
});

// Handle new item addition
app.post("/add", async (req, res) => {
  const item = req.body.newItem; // Get new item from form input
  try {
    await db.query("INSERT INTO items(title) VALUES ($1)", [item]); // Insert new item into the database
  } catch (err) {
    console.error("Error adding item:", err);
  }
  res.redirect("/"); // Redirect back to the main page after insertion
});

// Handle item editing
app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId; // Get item ID from form input
  const newTitle = req.body.updatedItemTitle; // Get updated title from form input
  
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [newTitle, itemId]); // Update item title in the database
  } catch (err) {
    console.error("Error updating item:", err);
  }
  res.redirect("/");
});

// Handle item deletion
app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId; // Get item ID to delete
  
  try {
    await db.query("DELETE FROM items WHERE id = $1", [itemId]); // Delete item from database
  } catch (err) {
    console.error("Error deleting item:", err);
  }
  res.redirect("/");
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});