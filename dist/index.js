"use strict";
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      }
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    (function () {
        var ownKeys = function (o) {
            ownKeys =
                Object.getOwnPropertyNames ||
                function (o) {
                    var ar = [];
                    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                    return ar;
                };
            return ownKeys(o);
        };
        return function (mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
            __setModuleDefault(result, mod);
            return result;
        };
    })();
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostService_1 = __importDefault(require("./services/PostService"));
const Sentry = __importStar(require("@sentry/node"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
Sentry.init({
    dsn: "VOTRE_DSN_SENTRY",
    tracesSampleRate: 1.0
});
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
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
    const usedPost = updatedPost; // Utilisez la variable
    console.log(usedPost); // Ou supprimez la déclaration si inutile
    res.redirect(`/posts/${req.params.id}`);
});
app.use("/error-test", (req, res) => {
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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
