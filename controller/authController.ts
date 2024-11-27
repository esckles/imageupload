import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import authModel from "../model/authModel";
import jwt from "jsonwebtoken";

// AUTH
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const acc = crypto.randomBytes(4).toString("hex");

    const user = await authModel.create({
      email,
      password: hashed,
      accNumber: acc,
    });
    return res.status(201).json({
      message: "account created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", data: error, status: 404 });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const getUser = await authModel.findOne({ email });
    if (getUser) {
      const passwordCheck = await bcrypt.compare(password, getUser.password);
      if (passwordCheck) {
        const token: any = jwt.sign(
          { id: getUser._id },
          process.env.TWT_SECRET as string,
          { expiresIn: process.env.JWT_TIME }
        );
        return res
          .status(200)
          .json({ message: "Welcome back", data: token, status: 200 });
      } else {
        return res
          .status(404)
          .json({ message: "error with password ", status: 404 });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Error with user email", status: 404 });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error", data: error, status: 404 });
  }
};
export const forgetUserPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const getUser = await authModel.findOne({ email });
    if (getUser) {
      return res.status(200).json({
        message: "a mail has been sent to you for account password reset",
        status: 200,
      });
    } else {
      return res
        .status(404)
        .json({ message: "no user with such Email on our DB", status: 404 });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", data: error, status: 404 });
  }
};
export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const { userID } = req.params;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await authModel.findByIdAndUpdate(
      {
        userID,
      },
      {
        password: hashed,
      },
      { new: true }
    );
    return res.status(201).json({
      message: "password updated successfully",
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", data: error, status: 404 });
  }
};

//////

///  PROFILE

export const readOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findById({ userID });
    return res.status(201).json({
      message: "user found successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", data: error, status: 404 });
  }
};
export const updatedOneUserName = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName } = req.body;

    const user = await authModel.findByIdAndUpdate({
      firstName,
      lastName,
      userName,
    });
    return res.status(201).json({
      message: "update user found names successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", data: error, status: 404 });
  }
};
export const updateOneUserAvater = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;

    const user = await authModel.findByIdAndUpdate(
      {
        userID,
      },
      {
        avater: "",
      },
      { new: true }
    );
    return res.status(201).json({
      message: "update user avater successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", data: error, status: 404 });
  }
};
