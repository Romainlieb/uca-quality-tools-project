"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostService_1 = __importDefault(require("./services/PostService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express_1.default.urlencoded({ extended: true }));
const postService = new PostService_1.default();
app.get("/", (req, res) => {
    res.render("home");
});
app.get("/posts", (req, res) => {
    const posts = postService.getAllPosts();
    res.render("posts", { posts });
});
app.post("/posts", (req, res) => {
    const post = postService.createPost(req.body);
    res.redirect("/posts");
});
app.get("/posts/new", (req, res) => {
    res.render("new-post");
});
app.get("/posts/:id/edit", (req, res) => {
    const post = postService.getPostById(parseInt(req.params.id));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("edit-post", { post });
});
app.get("/posts/:id", (req, res) => {
    const post = postService.getPostById(parseInt(req.params.id));
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.render("post", { post });
});
app.post("/posts/:id", (req, res) => {
    console.log(req.params.id);
    const updatedPost = postService.updatePost(parseInt(req.params.id), req.body);
    console.log(updatedPost); // à modifier dès que ce sera le moment de le résoudre
    res.redirect(`/posts/${req.params.id}`);
});
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
});
