//User Account Controller
// function :
//  -getAllUsers : get all users from database
//  -getOneUser : get user by refreshToken
//  -getUserByIdAccount : get user by uuid
//  -createUser : create user account (crud)
//  -updateUserAccount : update user account (crud)
//  -resetPasswordAccount : update password by regular role
//  -deleteUser : delete user account (crud)
//  -getUserManagement : table user management (Read)

import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import models from '../models'
import { Op } from 'sequelize';
import { Query } from 'express-serve-static-core';
require('dotenv').config();

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await models.useraccount.findAll({
            attributes: ['id', 'uuid', 'name', 'username', 'role']
        });
        res.json(users)
    } catch (error) {
        res.status(500).json(error);
    }
}

//get user by refresh token
export const getOneUser = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        const users = await models.useraccount.findOne({
            where: {
                refreshToken: refreshToken
            }
        });
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}

//get user by id
export const getUserByIdAccount = async (req: Request, res: Response) => {
    try {
        const users = await models.useraccount.findOne({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error);
    }
}

//create user
export const createUser = async (req: Request, res: Response) => {
    const { name, username, role, password } = req.body; //construct request body

    const user = await models.useraccount.findOne(
        {
            where: {
                username: username
            }
        });

    if (user) return res.status(409).json({ msg: "Pengguna dengan username tersebut telah ada!" });


    if (username.length < 8 || username.length > 24) return res.status(400).json({ msg: "username minimal 8 chars dan maksimal 24 chars" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await models.useraccount.create({    //save to db
            name: name,
            username: username,
            role: role,
            password: hashPassword
        });
        res.status(200).json({ msg: "Register berhasil!" });
    } catch (error) {
        console.log(error);
    }

}

//update user account 
export const updateUserAccountByAdmin = async (req: Request, res: Response) => {
    const { name, username, role, password, employee_title, department, division, sub_directorate, address, phone } = req.body;
    if (password.length < 8 || password.length > 24) return res.status(400).json({ msg: "password minimal 8 chars dan maksimal 24 chars" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const users = await models.useraccount.update({
            name: name,
            username: username,
            password: hashPassword,
            role: role,
            employee_title: employee_title,
            department: department,
            division: division,
            sub_directorate: sub_directorate,
            address: address,
            phone: phone
        },
            {
                where: {
                    uuid: req.params.uuid
                }
            });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

//update user account 
export const updateUserAccountRegular = async (req: Request, res: Response) => {

    try {
        const users = await models.useraccount.update(req.body,
            {
                where: {
                    uuid: req.params.uuid
                }
            });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

//update password by regular role
export const resetPasswordAccount = async (req: Request, res: Response) => {
    try {
        const { password, confirmPassword } = req.body;
        console.log(password.length);

        if (password.length < 8 || password.length > 24) return res.status(400).json({ msg: "password minimal 8 chars dan maksimal 24 chars" });
        if (password !== confirmPassword) return res.status(400).json({ msg: "Password tidak sama!" });

        //if password === confirmPasword
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await models.useraccount.update({    //save to db
            password: hashPassword
        },
            {
                where: {
                    uuid: req.params.uuid
                }
            }
        );

        res.json({ message: 'Password reset successful, you can now login with the new password' });

    } catch (e) {
        console.log(e);
    }
}

//update password by regular role
export const resetPasswordAccountbyAdm = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        console.log(password.length);

        if (password.length < 8 || password.length > 24) return res.status(400).json({ msg: "password minimal 8 chars dan maksimal 24 chars" });

        //if password === confirmPasword
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await models.useraccount.update({    //save to db
            password: hashPassword
        },
            {
                where: {
                    uuid: req.params.uuid
                }
            }
        );

        res.json({ message: 'Password reset successful, you can now login with the new password' });

    } catch (e) {
        console.log(e);
    }
}

//delete user account
export const deleteUser = async (req: Request, res: Response) => {
    try {
        await models.useraccount.destroy({
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json({ msg: "User deleted" });
    } catch (error) {
        console.log(error);
    }
}

export const refreshTokenAccount = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await models.useraccount.findAll({
            where: {
                refreshToken: refreshToken
            }
        });
        if (!user) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
            if (err) return res.sendStatus(403);
            //else, get value
            const userId = user.id;
            const uuid = user.uuid;
            const name = user.name;
            const username = user.username;
            const accessToken = jwt.sign({ userId, uuid, name, username }, process.env.ACCESS_TOKEN_SECRET as string, {
                expiresIn: '45s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

//tabel user management
export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export const getUserManagement = async (req: TypedRequestQuery<{ lastId: string, limit: string, search_query: string, page: string }>, res: Response) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const totalRows = await models.useraccount.count({
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await models.useraccount.findAll({
        raw: true,
        where: {
            [Op.or]: [{
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }, {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'ASC']
        ]
    })

    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}