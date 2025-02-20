const data = require("../data.json");

class PostService {
    constructor() {
        this.posts = [...data.posts];
    }

    getAllPosts() {
        return this.posts;
    }

    getPostById(id) {
        return this.posts.find((post) => post.id == id);
    }

    createPost(postData) {
        const newPost = {
            id: this.posts.length + 1,
            title: postData.title,
            content: postData.content,
            author: postData.author,
            createdAt: new Date().toISOString()
        };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id, postData) {
        const index = this.posts.findIndex((post) => post.id == id);
        if (index == -1) return null;

        this.posts[index] = {
            ...this.posts[index],
            title: postData.title,
            content: postData.content,
            author: postData.author,
            updatedAt: new Date().toISOString()
        };

        return this.posts[index];
    }
}

module.exports = PostService;
