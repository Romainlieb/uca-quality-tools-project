"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("../data.json"));
class PostService {
    constructor() {
        this.posts = [...data_json_1.default.posts];
    }
    getAllPosts() {
        return this.posts;
    }
    getPostById(id) {
        return this.posts.find((post) => post.id === id);
    }
    createPost(postData) {
        const newPost = {
            id: this.posts.length + 1,
            ...postData
        };
        this.posts.push(newPost);
        return newPost;
    }
    updatePost(id, postData) {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return null;
        this.posts[index] = { ...this.posts[index], ...postData };
        return this.posts[index];
    }
}
exports.default = PostService;
