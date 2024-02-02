import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`, {
        expiresIn
    });
    return token;
};

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = await req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        res.status(401).send("Token not Received");
        next();
    }
    else {
        const verified = jwt.verify(token, `${process.env.JWT_SECRET}`);
        if (verified) {
            res.locals.jwtData = verified;
            res.status(200).send(verified);

        }
        else {
            res.status(401).send("Token Expired");
        }
        next();
    }
};