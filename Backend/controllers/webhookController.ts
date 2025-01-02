import { Request, Response } from "express";
import User from "../models/User";
import { Webhook } from "svix";

export const Authenticate= {
    async test(req: Request, res: Response) {
        const SIGNING_SECRET = "whsec_kDaWhiJa4U3wJYCtU3jAcfUB2hb4rX8s";

        if (!SIGNING_SECRET) {
            return res.status(500).json({ status: "No signing secret provided" });
        }

        const wh = new Webhook(SIGNING_SECRET);

        const headers = req.headers;
        const payload = JSON.stringify(req.body);

        const svix_id = headers["svix-id"];
        const svix_timestamp = headers["svix-timestamp"];
        const svix_signature = headers["svix-signature"];

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({
                success: false,
                message: "Error: Missing svix headers",
            });
        }

        let evt: any;

        try {
            evt = wh.verify(payload, {
                "svix-id": svix_id as string,
                "svix-timestamp": svix_timestamp as string,
                "svix-signature": svix_signature as string,
            });
        } catch (err: any) {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        const type = evt.type;

        try {
            if (type === "user.created") {
                await handleUserCreated(evt);
            } else if (type === "user.updated") {
                await handleUserUpdated(evt);
            } else if (type === "user.deleted") {
                await handleUserDeleted(evt);
            } else {
                console.log(`Unhandled event type: ${type}`);
            }
            return res.status(200).json({ success: true, message: "Event processed successfully" });
        } catch (err: any) {
            console.error(err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
    },
};

// Function to handle user.created
async function handleUserCreated(evt: any) {
    if (!evt.data.email_addresses || evt.data.email_addresses.length === 0) {
        throw new Error("No email addresses found in payload");
    }

    const userName = evt.data.first_name;
    const email = evt.data.email_addresses[0]?.email_address;
    const u_id = evt.data.id;

    const user = await User.findOne({ user_id: u_id });
    if (user) {
        console.log("User already exists");
        return;
    }

    const newUser = new User({ user_id: u_id, userName: userName, email: email });
    console.log("Creating new user:", newUser);
    await newUser.save();
}

// Function to handle user.updated
async function handleUserUpdated(evt: any) {
    const u_id = evt.data.id;

    const user = await User.findOne({ user_id: u_id });
    if (!user) {
        throw new Error("User not found");
    }

    const updatedFields: any = {};
    if (evt.data.first_name) updatedFields.userName = evt.data.first_name;
    if (evt.data.email_addresses && evt.data.email_addresses.length > 0) {
        updatedFields.email = evt.data.email_addresses[0]?.email_address;
    }

    console.log("Updating user:", updatedFields);
    await User.updateOne({ user_id: u_id }, { $set: updatedFields });
}

// Function to handle user.deleted
async function handleUserDeleted(evt: any) {
    const u_id = evt.data.id;

    const user = await User.findOne({ user_id: u_id });
    if (!user) {
        throw new Error("User not found");
    }

    console.log("Deleting user:", user);
    await User.deleteOne({ user_id: u_id });
}
