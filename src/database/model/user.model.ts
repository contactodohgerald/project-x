import { Document, Schema, model } from "mongoose";
import { UserRole } from "../../config/enum";

interface IUser extends Document {
    account_type: string
    full_name: string
    email: string
    company_name: string
    password: string
    role: UserRole;
}

export interface IUserToAuthJSON {
    account_type: UserRole;
    full_name: string;
    email: string;
    token: string;
}

interface IUserModel extends Document, IUser { }

const schema = new Schema<IUserModel>(
    {
        account_type: {
            type: String,
            trim: true,
            enum: Object.values(UserRole),
        },
        full_name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        company_name: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(UserRole),
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export const User = model<IUserModel>("User", schema);
