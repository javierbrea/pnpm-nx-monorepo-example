# pnpm-nx-monorepo-example

Example of a monorepo using Pnpm and Nx.

This example is used in the next blog posts:

- [Pnpm and Nx monorepo. Part 2. Building a Node.js monorepo with Pnpm and Nx](https://www.javierbrea.com/blog/pnpm-nx-monorepo-02/)
- [Pnpm and Nx monorepo. Part 3. CI/CD for Pnpm and Nx monorepo using Github actions](https://www.javierbrea.com/blog/pnpm-nx-monorepo-03/)

## Update on content

This code has been improved with Nx tutorial of [Core Nx Tutorial - Step 1: Create Eleventy Blog](https://nx.dev/core-tutorial/01-create-blog).

## Update on usage

When you run the central Nx script, remove `nx` in the middle and just run like following.

- `pnpm build:all`
- `pnpm test:unit:affected`
- `pnpm test:unit:all`
