import "reflect-metadata"
import { DataSource } from "typeorm"
import { Settings } from "./config/settings"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Settings.DATABASE_HOST,
    port: parseInt(Settings.DATABASE_HOST) || 5432,
    username: Settings.DATABASE_USER || 'postgres',
    password: Settings.DATABASE_PASSWORD || '',
    database: Settings.DATABASE_NAME,
    synchronize: true,
    logging: false,
    // entities: [User],
    entities: ["src/entity/*.ts"],
})
