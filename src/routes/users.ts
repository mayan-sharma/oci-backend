import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import config from "../config/config";
import { userRequest } from "../config/interfaces";
import isAuth from "../middlewares/isAuth";
import User from '../models/user';
import hasRoles from "../middlewares/hasRoles";

const router = express.Router();

/**
 * @method GET
 * @route /api/user/
 * @Authorization Basic <Token>, role: Teacher
 */
router.get('/', isAuth, hasRoles(['teacher']), async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).send({
            message: 'All users',
            users
        })

    } catch(err) {
        console.log(err);
    }
});

/**
 * @method GET
 * @route /api/user/:enrollment_no
 * @Authorization Basic <Token>, role: Teacher
 */
router.get('/:id', isAuth, hasRoles(['teacher']), async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).send({
                message: 'User not found!'
            })
        }

        res.status(200).send({
            message: 'User found',
            user
        })

    } catch(err) {
        console.log(err);
    }
});

/**
 * @method DELETE
 * @route /api/user/:enrollment_no
 * @Authorization Basic <Token>, role: Teacher
 */
router.delete('/:id', isAuth, hasRoles(['teacher']), async (req: Request, res: Response) => {
    try {
        const isDeleted = await User.destroy({
            where: {
                enrollment_no: req.params.id
            }
        })

        if (isDeleted) {
            return res.status(200).send({
                message: 'User deleted',
            })
        }

        return res.status(400).send({
            message: 'User not found!'
        })

    } catch(err) {
        console.log(err);
    }
})

/**
 * @method POST
 * @route /api/user/register
 * @Authorization None
 */
router.post('/register', async (req: Request, res: Response) => {
    try {
        
        let user = await User.findByPk(req.body.enrollment_no);
        if (user) {
            return res.status(400).send({
                message: 'User already registered!'
            });
        }

        user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).send({
                message: 'Email already in use!'
            });
        }

        let newUser = {
            enrollment_no: req.body.enrollment_no,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };

        await User.create(newUser);

        const token = await jwt.sign(
            { enrollment_no: newUser.enrollment_no, role: newUser.role}, 
            config.SECRET,
            { expiresIn: '3600s' }
        );
        
        return res.status(200).send({
            message: 'User registered!',
            token
        });

    } catch(err) {
        console.log(err);
    }
});

/**
 * @method POST
 * @route /api/user/login
 * @Authorization None
 */
router.post('/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        
        if (!user) return res.status(400).send({
            message: 'Invalid email or password!'
        });
        
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).send({
                message: 'Invalid email or password!'
            });
        }

        const token = await jwt.sign(
            { enrollment_no: user.enrollment_no, role: user.role}, 
            config.SECRET,
            { expiresIn: '3600s' }
        );

        res.status(200).send({
            message: 'Logged in successfully!',
            token
        })
    
    } catch(err) {
        console.log(err);
    }
})

export default router;