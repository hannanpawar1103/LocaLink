import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TweetForm = () => {
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [tweets, setTweets] = useState([]);
    const [tweetId, setTweetId] = useState("");
    const [updateContent, setUpdateContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContentChange = (e) => setContent(e.target.value);
    const handleUserIdChange = (e) => setUserId(e.target.value);
    const handleTweetIdChange = (e) => setTweetId(e.target.value);
    const handleUpdateContentChange = (e) => setUpdateContent(e.target.value);

    const fetchUserTweets = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/tweets/${userId}`);
            setTweets(response.data.data);
        } catch (error) {
            console.error("Error fetching tweets", error);
        }
        setLoading(false);
    };

    const createTweet = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/tweets', { content });
            console.log(response.data);
            setContent("");
            fetchUserTweets();
        } catch (error) {
            console.error("Error creating tweet", error);
        }
        setLoading(false);
    };

    const updateTweet = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`/tweets/${tweetId}`, { content: updateContent });
            console.log(response.data);
            setUpdateContent("");
            fetchUserTweets();
        } catch (error) {
            console.error("Error updating tweet", error);
        }
        setLoading(false);
    };

    const deleteTweet = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/tweets/${id}`);
            setTweets(tweets.filter(tweet => tweet._id !== id));
        } catch (error) {
            console.error("Error deleting tweet", error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Tweet Manager</h1>

            {/* Create Tweet */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Create a Tweet</h2>
                <textarea
                    className="w-full p-2 border rounded-md resize-none"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="What's happening?"
                    rows="3"
                />
                <button
                    onClick={createTweet}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    disabled={loading || !content.trim()}
                >
                    {loading ? "Posting..." : "Post Tweet"}
                </button>
            </div>

            {/* Update Tweet */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Update a Tweet</h2>
                <input
                    className="w-full p-2 border rounded-md mb-2"
                    value={tweetId}
                    onChange={handleTweetIdChange}
                    placeholder="Enter Tweet ID to update"
                />
                <textarea
                    className="w-full p-2 border rounded-md resize-none"
                    value={updateContent}
                    onChange={handleUpdateContentChange}
                    placeholder="New tweet content"
                    rows="3"
                />
                <button
                    onClick={updateTweet}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    disabled={loading || !updateContent.trim()}
                >
                    {loading ? "Updating..." : "Update Tweet"}
                </button>
            </div>

            {/* Delete Tweet */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Delete a Tweet</h2>
                <input
                    className="w-full p-2 border rounded-md mb-2"
                    value={tweetId}
                    onChange={handleTweetIdChange}
                    placeholder="Enter Tweet ID to delete"
                />
                <button
                    onClick={() => deleteTweet(tweetId)}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    disabled={loading || !tweetId.trim()}
                >
                    {loading ? "Deleting..." : "Delete Tweet"}
                </button>
            </div>

            {/* Get User Tweets */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Get User Tweets</h2>
                <input
                    className="w-full p-2 border rounded-md mb-2"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="Enter User ID to fetch tweets"
                />
                <button
                    onClick={fetchUserTweets}
                    className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    disabled={loading || !userId.trim()}
                >
                    {loading ? "Loading Tweets..." : "Get Tweets"}
                </button>

                {/* Display Tweets */}
                <ul className="mt-6">
                    {tweets.length ? (
                        tweets.map((tweet) => (
                            <li key={tweet._id} className="p-3 border-b mb-2 flex justify-between items-center">
                                <span>{tweet.content}</span>
                                <button
                                    onClick={() => deleteTweet(tweet._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No tweets to display</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TweetForm;
