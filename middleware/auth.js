import jwt from 'jsonwebtoken';

export default function veriifyJWT(req, res, next) {
        const header = req.header("Authorization");
        if (header != null) {
            const token = (header.replace("Bearer ", ""))
            jwt.verify(token, "randon456", (err, decoded) => {
                console.log(err)
                console.log(decoded)
                if (decoded != null)
                    req.user = decoded
            }
            )

        }
        next()
    }  