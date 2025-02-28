import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/unit/**/*.test.ts"],
        exclude: ["tests/e2e/**/*"]
    }
});
