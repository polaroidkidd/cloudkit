[![Pull Request](https://github.com/polaroidkidd/cloudkit/actions/workflows/PR.yml/badge.svg)](https://github.com/polaroidkidd/cloudkit/actions/workflows/PR.yml) [![Merge to Master](https://github.com/polaroidkidd/cloudkit/actions/workflows/MERGE_MASTER.yml/badge.svg)](https://github.com/polaroidkidd/cloudkit/actions/workflows/MERGE_MASTER.yml)

# SvelteKit Cloudflare Template

This is a complete Sveltekit Template designed to help you release you SvelteKit App on Cloudflare Pages using the following services:

- TypeScript, ESLint, Prettier & Husky for pre-commit hooks
- Lucia Auth with a production-ready Sign Up/In/Out flow and Delete Account flow
- Prisma integration (psql & redis)
  - redis:
    - `prod`: Upstash Cluster
    - `dev/e2e`: Local redis docker container
  - psql:
    - `prod` Neon.Tech Database
    - `dev/e2e`: Local PSQL docker container
- Image hosting & processing
  - `prod`: Cloudflare Image Service
  - `dev/e2e`: Thumbor docker container
- Playwright for E2E Tests in Github Actions and for local development
- Github Actions (including Linting, Type-Verification, Unit & E2E Tests)
- Publishing Action for Github pages

You can check out the live example [here](https://cloudkit.dle.dev).

## Prerequisites

Becase PR.yaml action uses docker containers, you'll have to configure the following Github Action Secrets in a `CI` environment in order for the Workflow to run through without errors. Example Values of these can be cound in the `.env.ci` file.

## Running this locally

1. Create a `.env.development` file (you can just copy the `.env.example` file)
2. Start up the docker containers (`docker-compose up -d`)
3. Run `pnpm prep`. This will
4. Run the correct prisma generate command
5. Push the schma to the local psql db
6. Run the `pnpm psql:seed` command which will generate a admin user and 10 random users.
7. Start the dev server (`pnpm dev`)

## Running this in Production

You'll need to configure some services and environment variables in the Github Actions to run this in Prod.

### Services

- [Cloudflare Pages](https://pages.cloudflare.com/) - There is a free tier but even the paid tier isn't very expensive.
- [Cloudflare Images](https://www.cloudflare.com/developer-platform/cloudflare-images/) - This one is paid only. It's 5 USD / Month / 100'000 Image served with 20 configured variations (the variations do not count to the 100'000 image limit). Delivering images is 1 USD for every 100'000 images. There's also a enterprise version. Check out the details [here](https://developers.cloudflare.com/images/pricing/)
- [Neon.Tech](https://neon.tech/) Database - I've been using their free tier for ages without hitting any limits so far. The only reason I went ahead and upgraded was because you can only have one project on the free tier. They don't charge you for a month if the bill is under 50 Cent. It's very affordable for what you're getting. Seriously, [check them out](https://neon.tech/pricing)
- [Upstash](https://upstash.com/) - They have a generous free tier. Personally, I use the "Pay As You Go" option and set a low budget limit. Check out their pricing [here](https://upstash.com/pricing)
- [Prisma Cloud](https://cloud.prisma.io/) - You will not be able to hack your way around this one because prisma's edge client doesn't allow connecting to a database directly. They have a generous free tier and that's the only thing I use them for. Create a project [here](https://cloud.prisma.io/), create the Connection String and use this. Their DataExplorer will then be linked to the production database, which can be quite handy as well.

### Github Actions Environemnts

I've configured the actions using a `CI` and a `PREVIEW` environment. The Variables keys for both are the same (see `.env.example`).
The `CI` environment values should use the same values as in the `.env.example` file, as these are used to run the e2e tests against the docker containers.
The `PREVIEW` values need to be set values from the relevant services.

In addition to these you'll have to configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to enable preview & production publishing. You can optain the `CLOUDFLARE_API_TOKEN` in the cloudflare dashboard. Create a new token which allows editing for Cloudflare Pages. Then set up a Pages Project. The Github Action should then deply accordingly. You can also assign it to a domain if you use cloudlfare to manage your domains (I highly reccomend this, it makes life so much easier).

## Notes about this Project

I've collected some information I think you might find useful when working with this template.

### Scripts

I've included a lot of scripts in the `package.json` file. The mostly depend on each other. The naming follows this pattern in general

`[WHAT]:[ACTION]:[ENV]`.

For example, If I want to generate my prisma schema for local development I would run `pnpm prisma:gen:dev`.

Here are some useful scripts

- `pnpm psql:dump` - Dumps the content of the current database into a `cloudkit-db-dump.sql` file. You can mout this as a volume in the `docker-compose.yaml` file in the `psql` section with this path `- ./cloudkit-db-dump.sql:/docker-entrypoint-initdb.d/init.sql` which will initialize the psql container with those contents on start up every time.
- `pnpm psql:restore` - Restores from the latest `cloudkit-db-dump.sql` file, if it exists.
- `pnpm test:e2e:dev` - Runs the sveltekit development server and Playwright in UI mode. This way you can code and verify your tests at the same time.
- `pnpm clean` - Deletes the `./playwright-report`, `./.wrangler` and `./.svelte-kit` folders for a clean slate
- `pnpm prep` - If your docker containers are running, this will generate the prisma schema, push it to the psql container and seed the database

### Data Proxy

As previously mentioned, prisma doesn't a direct connection to Databases form edge functions. You need to create a [Data Proxy](https://www.prisma.io/docs/data-platform/classic-projects/data-proxy), which does some prisma magic and then you can use Prisma in Edge Functions. This is why there are two prisma schemas.

The "normal" way of defining your data source is this

```
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

If you're using the Data Proxy, you have to declare it like this

```
datasource db {
  provider  = "postgresql"
  url       = env("DATA_PROXY")
  directUrl = env("DATABASE_URL")
}
```

The `DATABASE_URL` refers to the standard Database URL and `DATA_PROXY` refers to the connection string you generate when creating a [Cloud Prisma Project](https://cloud.prisma.io/) - Its free for mostly everything.

### Prisma Code Organization

I couldn't find a good way to keep all my prisma relevant code together so I came up with the following solution. There are two `Repository` classes. One for managing Users and one for managing Images. I've split the Prisma code up like this in order to keep the primsa imports to a bare minimum. All DB Actions I do via these classes and they are called only from the server.

**Note:** The `ImageRepository` can interchangebly be used with the local thumbor container or with Cloudflare's Image Service.

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
      - pull random images from [picsum](https://picsum.photos/)
      - upload these into the `thumbor` container
      - insert the relevant information into the `psql` container
  - Runs e2e tests
    - Playwright CI test we have a headless configuration - `playwright.config.ci.ts`
    - Note that these tests can be slow and might incur charges on your github account. You can always run them locally instead.

## Roadmap

- Update to the latest SvelteKit version
- Update the project initialization on cloudflare
- Include generation of the Image Resolver Worker in the project initialization
