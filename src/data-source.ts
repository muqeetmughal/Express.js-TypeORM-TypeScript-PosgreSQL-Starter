import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "express_starter",
    synchronize: true,
    logging: false,
    // entities: [User],
    entities: ["src/entity/*.ts"],
})
