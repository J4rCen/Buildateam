import { Sequelize, SequelizeOptions } from "sequelize-typescript"
import shopifyData from "./models/shopyfiData.model"

const sequelizeOptions: SequelizeOptions = {
    host: "localhost",
    dialect: "postgres",
    username: "postgres",
    password: "postgres",
    port: 5432,
    database: "postgres"
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