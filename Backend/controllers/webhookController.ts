import { Request, Response } from "express";
import User from "../models/User";
import { Webhook } from "svix";
export const webhookController = {

    async test(req: Request, res: Response) {
        const SIGNING_SECRET = "whsec_kDaWhiJa4U3wJYCtU3jAcfUB2hb4rX8s";

        if (!SIGNING_SECRET) {
            res.status(500).json({ status: "No signing status" });
        }

        const wh = new Webhook(SIGNING_SECRET);


        // Get headers and body
        const headers = req.headers;
        const payload = JSON.stringify(req.body);
        // Get Svix headers for verification
        const svix_id = headers["svix-id"];
        const svix_timestamp = headers["svix-timestamp"];
        const svix_signature = headers["svix-signature"];
        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({
                success: false,
                message: "Error: Missing svix headers",
           });
        }
        let evt: any;

        // Attempt to verify the incoming webhook
        // If successful, the payload will be available from 'evt'
        // If verification fails, error out and return error code
        try {
            evt = wh.verify(payload, {
                "svix-id": svix_id as string,
                "svix-timestamp": svix_timestamp as string,
                "svix-signature": svix_signature as string,
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
       }
        let userName = evt.data.first_name;
        let email = evt.data.email_addresses[0].email_address;
        let u_id = evt.data.id;
        let user = User.findOne({user_id: u_id});
        console.log(user)
        if (user){
            console.log("User already exists");
            return;
        }
        let newUser = new User({user_id: u_id, userName: userName, email: email});
        await newUser.save();

    },
};
