import jwt from 'jsonwebtoken'
import 'dotenv/config'


export function checkAdmin(req, res, next) {

    const { authorization } = req.headers   

    if (!authorization) {

        return res.status(401).json({

            error: 'Unauthorized'

        })
    }

    const partsAuth = authorization.split(' ')
    

    if (partsAuth[0] !== 'Bearer' || partsAuth.length > 2) {

        return res.status(401).json({

            error: 'Unauthorized'

        })

    }
    
    try {

        const verifyToken = jwt.verify(partsAuth[1], process.env.PRIVATE_KEY)
        next()

    } catch {

        return res.status(401).json({

            error: 'Unauthorized'

        })

    }

}