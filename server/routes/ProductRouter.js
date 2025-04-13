import express from 'express';
const router = express.Router();
import ensureAuthenticated from '../middlewares/Auth.js';

router.get('/',ensureAuthenticated,(req,res) =>{
    console.log("logged in user detail",req.user)
    res.status(200).json([
        {
            name:"mobile",
            price:1000
        },
        {
            name:"tv",
            price:2000
        }
    ])
})





export default router;
