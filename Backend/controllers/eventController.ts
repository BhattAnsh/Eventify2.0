import Event from "../models/Event";
import {Request, Response} from 'express';
import User from "../models/User";

export const eventController = {
    async createEvent(req:Request, res:Response){
        let data = req.body;
        let id = data.id;
        let user = await User.findOne({user_id: id});
        if(user){
            console.log("user found")
            return res.status(200).json({success: true, message: "user found"});
        }
        else{
            console.log("user not found")
            return res.status(200).json({success:true, message: "user not found"});
        }

    }
}
