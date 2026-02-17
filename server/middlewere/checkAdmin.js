import jwt from 'jsonwebtoken'
import 'dotenv/config'


export function checkAdmin(req, res, next) {

    const { authorization } = req.headers
    console.log(req.headers);
    
    console.log(authorization);
    

    if (!authorization) {

        return res.status(401).json({

            error: 'Unauthorized'

        })
    }

    const partsAuth = authorization.split(' ')
    console.log(partsAuth);
    

    if (partsAuth[0] !== 'Bearer' || partsAuth.length > 2) {

        return res.status(401).json({

            error: 'Unauthorized'

        })

    }

    const verifyToken = jwt.verify(partsAuth[1], process.env.PRIVATE_KEY)

    if (!verifyToken) {

        return res.status(401).json({

            error: 'Unauthorized'
        })
    }

    next()

}