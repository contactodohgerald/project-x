import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config";

export const authorizationMiddleware = (allowedRoles: any) => {
    return async (req: any, res: any, next: any) => {
        try {
            // Check if user is authenticated
            const bearer = req.headers.authorization;
            const bearerToken = bearer?.split(" ");
            const token = bearerToken && bearerToken![1];
            if (!token) return res.status(401).send({success: false, message: "Invalid Token"});

            const user: any = jwt.verify(token, JWT_SECRET);
            // Check if user's role is allowed
            if (!allowedRoles.includes(user?.role)) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized to perform action",
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};