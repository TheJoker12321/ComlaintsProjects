import { DataTypes } from "sequelize";
import sequelize from "./createDB.js";

const Message = sequelize.define('message', {

    message: {type: DataTypes.STRING, allowNull: false},
    category: {type: DataTypes.STRING, allowNull: false}

})


export default Message