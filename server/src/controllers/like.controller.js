import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleLike = async (userId, targetId, targetType) => {

    if (!isValidObjectId(targetId)) {
      throw new ApiError(400, `Invalid ${targetType} ID`);
    }

    const existingLike = await Like.findOne({
        userId,
        targetId,
        targetType
    });

    if(existingLike){
        await Like.deleteOne({_id : existingLike._id});
        return{Like : false}
    }else{
        const like = new like({
            userId,
            targetId,
            targetType
        });
        await like.save();
        return{liked : true}
    }

}

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const userid = req.user.id;
    
    const result = await toggleLike(userid,tweetId , "tweet" )
    res.status(200).json(new ApiResponse(200, `Tweet ${result.liked ? 'liked' : 'unliked'}`, result));
});
const getLikedTweet = asyncHandler(async (req, res) => {
    const userId = req.user.id;
  
    const likedTweets = await Like.find({ userId, targetType: "tweet" }).populate("targetId");
    res.status(200).json(new ApiResponse(200, "Liked tweets retrieved", likedTweets));
  });
  
  export {
    toggleCommentLike,
    toggleLike,
    getLikedTweet // Corrected export to match the new function name
  };