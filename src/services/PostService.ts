import data from "../data.json";

export default class PostService {
    private posts: any[];

    constructor() {
        this.posts = [...data.posts];
    }

    getAllPosts() {
        return this.posts;
    }

    getPostById(id: number) {
        return this.posts.find((post) => post.id === id);
    }

    createPost(postData: { title: string; content: string; author: string }) {
        const newPost = {
            id: this.posts.length + 1,
            ...postData
        };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id: number, postData: { title?: string; content?: string; author?: string }) {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return null;

        this.posts[index] = { ...this.posts[index], ...postData };
        return this.posts[index];
    }
}
