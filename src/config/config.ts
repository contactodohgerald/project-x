import dotevn from 'dotenv';
dotevn.config();

export const PORT = process.env.SERVER_PORT || 9000;

export const JWT_SECRET = process.env.JWT_SECRET || "aa9bbad583dbb062f571f38511d807af8928ff4b2dea4df00dd9df15e651a442265c0ab96a0da3632d9d4bd6851b236b9f8bee31b";
export const JWT_EXPIRE = process.env.JWT_EXPIRES || "1d";
