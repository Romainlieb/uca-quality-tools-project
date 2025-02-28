import express from "express";
import path from "path";

const app = express();

// Configuration des vues
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.get("/error-test", (req, res) => {
    try {
        throw new Error("Test error");
    } catch (error) {
        res.status(500).render("error", {
            message: "Test error",
            error: error
        });
    }
});

app.listen(3009, () => {
    console.log("Test server running on http://localhost:3009");
});
