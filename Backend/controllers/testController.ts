import {Request, Response} from 'express';
import { getAuth } from '@clerk/express';
//for test request
export const Test = (req:Request, res:Response)=>{
    let userId = getAuth(req)
    console.log(userId);
    res.status(200).json({"message":"request successfull"})
}
