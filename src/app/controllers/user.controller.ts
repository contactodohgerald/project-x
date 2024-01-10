import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Validator from 'validatorjs';
import bcrypt from "bcrypt";
import { User } from "../../database/model/user.model";
import { UserRole } from "../../config/enum";

class UserController {

    addAccount = asyncHandler( async(req: Request, res: Response): Promise<any> => {
        const body : Record<string, any> = req.body
        const validator = new Validator(body, {
            fullName: 'required|string|min:3',
            email: 'required|email|string'
        })
        if (validator.fails()) return res.status(400).json({status: false, message: validator.errors.all()})

        const { fullName, email} = body;

        const emailExists = await User.findOne({email})
        if (emailExists) return res.status(400).json({status: false, message: "Email already exists"}) 

        const password = 'password'

        const hashPassword = await bcrypt.hash(password, 10);

        const saveUser = await User.create({
            account_type: UserRole.user, full_name: fullName, email, password: hashPassword, role: UserRole.user
        });

        if (!saveUser) return res.status(500).json({status: false, message: 'An error occured'});
        
        return res.status(201).json({status: true, message: "Account added successfully", data: saveUser});

    })

    fetchUsers = asyncHandler( async (req: Request, res: Response): Promise<any> => {
        const users = await User.find();

        if(users.length == 0) return res.status(403).json({status: false, message: "no taskes was found", data: []})

        return res.status(200).json({status: true, message: "User's task returned successfully", data: users})

    })

    fetchUser = asyncHandler( async (req: Request, res: Response): Promise<any> => {
        const params =  req.params.id

        const user = await User.findById(params)

        if(!user) return res.status(403).json({status: false, message: "no task was found", data: {}})

        return res.status(200).json({status: true, message: "User returned successfully", data: user})

    })
}

export default new UserController()