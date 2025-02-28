import express, { Request, Response } from "express";
import PostService from "./services/PostService";
import * as Sentry from "@sentry/node";
import path from "path";

const app = express();

if (process.env.NODE_ENV !== "test") {
    Sentry.init({
        dsn: process.env.SENTRY_DSN || "VOTRE_DSN_SENTRY",
        tracesSampleRate: 1.0
    });
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const postService = new PostService();

app.get("/", (req: Request, res: Response) => {
    res.render("home");
});

app.get("/posts", (req: Request, res: Response) => {
    const posts = postService.getAllPosts();
    res.render("posts", { posts });
});

app.post("/posts", (req: Request, res: Response) => {
    const post = postService.createPost(req.body);
    res.redirect("/posts");
});

app.get("/posts/new", (req: Request, res: Response) => {
    res.render("new-post");
});

app.get("/posts/:id/edit", (req: Request, res: Response) => {
    const post = postService.getPostById(parseInt(req.params.id));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("edit-post", { post });
});

app.get("/posts/:id", (req: Request, res: Response) => {
    const post = postService.getPostById(parseInt(req.params.id));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("post", { post });
});

app.post("/posts/:id", (req: Request, res: Response) => {
    console.log(req.params.id);
    const updatedPost = postService.updatePost(parseInt(req.params.id), req.body);
    const usedPost = updatedPost; // Utilisez la variable
    console.log(usedPost); // Ou supprimez la déclaration si inutile
    res.redirect(`/posts/${req.params.id}`);
});

app.use("/error-test", (req: Request, res: Response) => {
    console.log("Route /error-test appelée");
    try {
        throw new Error("Ceci est une erreur de test pour Sentry");
    } catch (error) {
        console.error("Erreur capturée :", error);
        Sentry.captureException(error);
        res.status(500).render("error", {
            message: "Une erreur s'est produite",
            error: process.env.NODE_ENV === "development" ? error : {}
        });
    }
});

const PORT = process.env.PORT || 3009;
console.log("Serveur démarré");
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Sentry DSN:", process.env.SENTRY_DSN);
});

// Pour permettre l'arrêt du serveur dans les tests
if (process.env.NODE_ENV === "test") {
    process.on("SIGTERM", () => {
        server.close(() => {
            console.log("Server closed");
            process.exit(0);
        });
    });
}
