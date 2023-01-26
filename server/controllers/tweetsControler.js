const User = require('../models/users');
const Tweet = require('../models/tweets');
const {ObjectId}= require('mongodb');

exports.findUser = async (req, res, next) => {
    const userName = req.body.username;
    const usrs = await User.findOne({ username: `@${userName}` });
    const { firstName, lastName, username } = usrs;
    console.log(firstName, lastName, username);
    res.status(200).json({ firstName, lastName, username });
};

exports.getTweets = async (req, res, next) => {
    const users = await User.findOne({ _id: new ObjectId(req.params.uid)}, "following");
    let tweets= await Tweet.find({user: {$in: users.following}}).sort({timePosted: -1}).skip(+req.params.pageNo*6).limit(5).populate('user');
    res.status(200).json(tweets);
}

exports.saveTweet = async (req, res, next) =>{
    const tweet = await new Tweet(req.body).save();
    res.status(200).json(tweet);
};

exports.deleteTweet= async(req, res, next)=>{
    let tweet= await Tweet.findById(new ObjectId(req.body.postId));
    if(tweet){
        if(req.body.userId===tweet.user.toString())
            {
                await Tweet.findByIdAndDelete(new ObjectId(req.body.postId));
                res.send("Deleted")
            }
    }
    else res.send("Try again");
} 