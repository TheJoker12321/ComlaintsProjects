import { Sequelize } from "sequelize";
import 'dotenv/config'


const sequelize = new Sequelize({

    database: "messages",
    dialect: 'mysql',
    username: 'root',
    password: '',
    logging: true
})

export default  sequelize 