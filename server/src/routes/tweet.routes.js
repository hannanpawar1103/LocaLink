import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Apply verifyJWT middleware to all routes
router.use(verifyJWT);

// Define routes
router.post("/", createTweet);
router.get("/user/:userId", getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
