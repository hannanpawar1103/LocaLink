import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all comments for a specific tweet with pagination
const gettweetComments = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Validate tweetId
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const comments = await Comment.find({ tweetId })
        .populate("author", "username") // Assuming the author field references the User model
        .sort({ createdAt: -1 }) // Sort by newest comments first
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const totalComments = await Comment.countDocuments({ tweetId });

    res.status(200).json(new ApiResponse(200, "Comments retrieved successfully", {
        comments,
        totalPages: Math.ceil(totalComments / limit),
        currentPage: page
    }));
});

// Add a comment to a tweet
const addComment = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Assuming user authentication is handled

    // Validate tweetId
    if (!mongoose.isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    // Ensure content is not empty
    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content cannot be empty");
    }

    const comment = new Comment({
        tweetId,
        content,
        author: userId
    });

    await comment.save();

    res.status(201).json(new ApiResponse(201, "Comment added successfully", comment));
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validate commentId
    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Ensure the comment belongs to the current user
    if (comment.author.toString() !== userId) {
        throw new ApiError(403, "You do not have permission to update this comment");
    }

    // Update the comment content
    comment.content = content || comment.content;
    await comment.save();

    res.status(200).json(new ApiResponse(200, "Comment updated successfully", comment));
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Validate commentId
    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Ensure the comment belongs to the current user
    if (comment.author.toString() !== userId) {
        throw new ApiError(403, "You do not have permission to delete this comment");
    }

    // Delete the comment
    await comment.deleteOne();

    res.status(200).json(new ApiResponse(200, "Comment deleted successfully"));
});

export {
    gettweetComments,
    addComment,
    updateComment,
    deleteComment
};
