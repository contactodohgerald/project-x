import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import bcrypt from "bcrypt";
import { User } from "../../database/model/user.model";
import { JWT_EXPIRE, JWT_SECRET } from "../../config/config";


class LoginController {

    loginUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body

        const validator = new Validator(body, {
            email: 'required|string',
            password: 'required|string|min:3',
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const {email, password} = body

        let userExists = await User.findOne({email})
        if(!userExists) return res.status(400).json({status: false, message: "Email does not exist"})

        const checkPassword = await bcrypt.compare(password, userExists.password);
        if(!checkPassword) return res.status(400).json({status: false, message: "Incorrect password"});

        const payload = {uuid: userExists._id, fullName: userExists.full_name, role: userExists.role, email: userExists.email}
        const token = jwt.sign(
            payload, JWT_SECRET, {expiresIn: JWT_EXPIRE}
        );

        return res.status(200).json({status: true, message: "login successfull", data: {
            ...payload, token, 
        }})
    })


}

export default new LoginController()