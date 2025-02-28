import { describe, it, expect, beforeEach } from "vitest";
import PostService from "../../src/services/PostService";

describe("PostService", () => {
    let postService: PostService;

    beforeEach(() => {
        postService = new PostService();
    });

    // ... existing tests ...
});
