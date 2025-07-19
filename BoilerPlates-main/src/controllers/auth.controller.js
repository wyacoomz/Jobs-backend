import {
  registerUserService,
  loginUserService,
} from "../services/auth.services.js";
import User from "../models/user.model.js"

// REGISTER
export const register = async (req, res) => {
  try{
    const uploadFile = req.file;//coming from multer

    const userData = {
      ...req.body,
      resume: uploadFile?.filename || null, //or uploaded?.path
    };
    const { user, token } = await registerUserService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ user, message: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { user, token } = await loginUserService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user, message: "Login successful" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

//Login with phone
export const loginWithPhone = async (req, res) =>{
    try{
        const {name, phone } = req.body;
        if(!phone || !name){
            return res.status(400).json({error: "phone and Name are required"});
        }
        let user = await User.findOne({ phone });

        if(!user){
            user = await User.create({
            name,
            phone,
            
            });
        }
        const token = user.generateToken();
        res.cookie("token", token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({
            user,
            message: user.isNew ? "Registered via phone" : "Login via phone",
        });
    }
        catch (err) {
            res.status(500).json({error: err.message});
        }  
};

//GET USER BY ROLE

export const getUserByRole = async (req, res) =>{
    try{
        const { role } = req; //injected by middelware
        const users = await User.find({ role });

        res.status(200).json({
            count: users.length,
            users,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};