## Getting Started

1. clone
2. npm install
3. create a feature branch
4. yeehaw

### To run back-end

`npm run start:dev // localhost:3025`

### To runt front-end

`npm run start // localhost:3000`

### Development Workflow

#### Migrations

When you change a table, go to package.json and name migration in `npm run migration:generate`. After generating you should run the migration `npm run migration:run` and also run `npm run build`.
