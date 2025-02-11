import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new tweet
const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;  // Assuming user info is stored in req.user after authentication

    // Check if the tweet content is provided
    if (!content || content.trim() === "") {
        throw new ApiError(400, "Tweet content cannot be empty.");
    }

    // Create a new tweet
    const tweet = new Tweet({
        content,
        author: userId,
    });

    await tweet.save();

    res.status(201).json(new ApiResponse(201, "Tweet created successfully", tweet));
});

// Get all tweets of a specific user
const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Validate userId
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    // Fetch all tweets for the given user
    const userTweets = await Tweet.find({ author: userId }).sort({ createdAt: -1 });

    if (!userTweets.length) {
        throw new ApiError(404, "No tweets found for this user");
    }

    res.status(200).json(new ApiResponse(200, "User tweets retrieved successfully", userTweets));
});

// Update a tweet by tweetId
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validate tweetId
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    // Find the tweet by ID
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    // Ensure the tweet belongs to the current user
    if (tweet.author.toString() !== userId) {
        throw new ApiError(403, "You do not have permission to update this tweet");
    }

    // Update the tweet content
    tweet.content = content || tweet.content;
    await tweet.save();

    res.status(200).json(new ApiResponse(200, "Tweet updated successfully", tweet));
});

// Delete a tweet by tweetId
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user.id;

    // Validate tweetId
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    // Find the tweet by ID
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    // Ensure the tweet belongs to the current user
    if (tweet.author.toString() !== userId) {
        throw new ApiError(403, "You do not have permission to delete this tweet");
    }

    // Delete the tweet
    await tweet.deleteOne();

    res.status(200).json(new ApiResponse(200, "Tweet deleted successfully"));
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
};
