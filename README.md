# SvelteKit Template

This is a complete Sveltekit Template designed to help you release you SvelteKit App using the following services:

- TypeScript, ESLint, Prettier & Husky for pre-commit hooks
- Lucia Auth with a production-ready Sign Up/In/Out flow and Delete Account flow
- Prisma integration
- Playwright for E2E Tests in Github Actions and for local development
- Github Actions (including Linting, Type-Verification, Unit & E2E Tests)
- Image hosting & processing using thumbor

## Prerequisites

Becase PR.yaml action uses docker containers, you'll have to configure the following Github Action Secrets in a `CI` environment in order for the Workflow to run through without errors. Example Values of these can be cound in the `.env.ci` file.

- `DATABASE_URL`
- `REDIS_URL`
- `REDIS_TOKEN`
- `PUBLIC_THUMBOR_URL`
- `THUMBOR_UPLOAD_URL`
- `IS_CI`

## Understanding the PR.yaml Github Action

The Github PR.yaml action triggers on every opened PR and on fresh pushes to that PR and runs the following jobs:

- `INSTALL`: Installs depdendencies from `pnpm-lock.yaml` and caches them
- `LINT`: Runs prettier and the sveltekit-check command
- `UNIT_TEST`: Runs unit tests using `vitest`
- `E2E_TEST`:
  - Launches the following docker containers
    - `ghcr.io/minimalcompact/thumbor` - Image CRUD Service
    - `redis:6.2` - For keeping track of sessions and avoid hitting the DB for every session validation
    - `postgres:15` - Database
  - Prepares the `psql` container
    - Runs the `prisma generate` and `prisma push` command. This creates the basic DB and schema
    - Runs the `prisma seed` command. This will:
      - generate 10 random users
      - pull random images from (picsum)[https://picsum.photos/]
      - upload these into the `thumbor` container
      - insert the relevant information into the `psql` container
  - Runs e2e tests
    - Playwright CI test we have a headless configuration - `playwright.config.ci.ts`
    - Note that these tests can be slow and might incur charges on your github account. You can always run them locally instead.
