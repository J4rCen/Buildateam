import { Sequelize, SequelizeOptions } from "sequelize-typescript"
import shopifyData from "./models/shopyfiData.model"
import dotenv from "dotenv"
import * as proces from "process"

dotenv.config({path: '../../.env'})

const {
    POSTGRES_HOST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
} = proces.env

const sequelizeOptions: SequelizeOptions = {
    host: POSTGRES_HOST,
    dialect: "postgres",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT),
    database: POSTGRES_DB
}

const sequelize = new Sequelize(sequelizeOptions)
sequelize.addModels([shopifyData])

async function connectDB() {
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: true})

        console.log("Connection completed successfully")
    } catch (error) {
        console.log("An error occurred while connecting")
        console.error(error)
    }
}

export default connectDB