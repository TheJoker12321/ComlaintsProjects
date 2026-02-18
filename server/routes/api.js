import express, { response } from 'express'
import Message from '../DB/createTables.js'
import jwt from 'jsonwebtoken'
import { checkAdmin } from '../middlewere/checkAdmin.js'


const api = express.Router()


api.post('/complaints', async (req, res) => {

    const { message, category } = req.body

    await Message.create({message: message, category: category})
    const result = await Message.findOne({$and: [{message: message}, {category: category}]})

    res.status(201).json({

        success: 'created successfully',
        message: {
            message,
            category,
            createdAt: result.createdAt
        }
    })
})

api.post('/admin/login', (req, res) => {

    const { password } = req.body
    const adminPassword = process.env.ADMIN_PASSWORD

    if (password !== adminPassword) {

        return res.status(401).json({

            error: 'Unauthorized'

        })
    }

    const token = jwt.sign({username: 'admin'}, process.env.PRIVATE_KEY, {expiresIn: '1min'})

    res.status(201).json({
        message: "success",
        token,
    })

})

api.get('/checkToken', checkAdmin, (req, res) => {

    res.status(200).json({

        isOpen: true
        
    })
})

api.get('/complaints/:type', checkAdmin, async (req, res) => {
    
    const { type } = req.params

    let result;
    let data;

    if (type === 'all') {
        result = await Message.findAll({order: [['createdAt', 'DESC']]})
        data = result.map(message => message.dataValues)

        res.status(200).json({

            response: data

        })

    } else {
        
        result = await Message.findAll({where: {category: `${type}`}}, {order: [['createdAt', 'DESC']]})
        data = result.map(message => message.dataValues)
        

        res.status(200).json({

            response: data 

        })

    }
        
})




export default api


