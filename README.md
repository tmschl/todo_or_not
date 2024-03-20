## Getting Started

1. clone
2. npm install
3. create a feature branch
4. yeehaw

### To run back-end

`npm run start:dev --watch  // localhost:3025`

### To runt front-end

`npm run start // localhost:3000`

### Development Workflow

#### Migrations

When you change, add, or delete a table, run migrations from package.json

1. To name migration, add migraiton name at end of `npm run migration:generate` string: e.g. `npm run typeorm -- -d ./src/config/typeorm.ts migration:generate ./src/migrations/[add-migration-name-here]`.
2. One generated, you should run the migration `npm run migration:run`
3. Then, to polish, re:run `npm run build`.
