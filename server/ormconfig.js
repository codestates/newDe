require('dotenv').config();

module.exports = {    
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: ['./src/entities/**/*.ts'],
    migrations: ['./src/migration/**/*.ts'],
    subscribers: ['./src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: './src/entities',
        migrationsDir: './src/migrations',
        subscribersDir: './src/subscriber'
    }
}
