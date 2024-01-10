import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import bcrypt from "bcrypt";
import { User } from "../../database/model/user.model";
import { UserRole } from "../../config/enum";

class RegisterController {

    registerUser = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            fullName: 'required|string|min:3',
            email: 'required|email|string',
            companyName: 'required|string|min:3',
            password: 'required|string|min:3',
            c_password: 'required|string|min:3'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { fullName, companyName, email, password, c_password} = body;

        if(password != c_password) return res.status(400).json({status: false, message: "Password does not match"});

        const emailExists = await User.findOne({email})
        if (emailExists) return res.status(400).json({status: false, message: "Email already exists"}) 

        const hashPassword = await bcrypt.hash(password, 10);

        const saveUser = await User.create({
            account_type: UserRole.super_admin, full_name: fullName, email, company_name: companyName, password: hashPassword, role: UserRole.super_admin
        });

        if (!saveUser) return res.status(500).json({status: false, message: 'An error occured'});
        
        return res.status(201).json({status: true, message: "Account created successfully", data: saveUser});

    })

}

export default new RegisterController()