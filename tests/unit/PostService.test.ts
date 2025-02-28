import { describe, it, expect, beforeEach } from "vitest";
import PostService from "../../src/services/PostService";

describe("PostService", () => {
    let postService: PostService;

    beforeEach(() => {
        postService = new PostService();
    });

    it("devrait retourner une liste d'articles", () => {
        const posts = postService.getAllPosts();
        expect(posts).toBeInstanceOf(Array);
        expect(posts.length).toBeGreaterThan(0);
    });

    it("devrait créer un nouvel article", () => {
        const newPost = { title: "Nouvel article", content: "Contenu de l'article" };
        const createdPost = postService.createPost(newPost);
        expect(createdPost).toHaveProperty("id");
        expect(createdPost.title).toBe(newPost.title);
        expect(createdPost.content).toBe(newPost.content);
    });

    it("devrait retourner un article par son ID", () => {
        const post = postService.getPostById(1);
        expect(post).toBeDefined();
        expect(post?.id).toBe(1);
    });

    it("devrait mettre à jour un article existant", () => {
        const updatedData = { title: "Titre mis à jour", content: "Contenu mis à jour" };
        const updatedPost = postService.updatePost(1, updatedData);
        expect(updatedPost).toBeDefined();
        expect(updatedPost?.title).toBe(updatedData.title);
        expect(updatedPost?.content).toBe(updatedData.content);
    });
});
