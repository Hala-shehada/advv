const sequelize = require('./db/mysql')

const express = require('express')

const users = require('./models/user')
const tweets = require('./models/tweet')
const Followers =require('./models/followers')
const Saved_tweets =require('./models/saved_tweets')
const Hidden_tweets=require('./models/hidden_tweets')
const Comments = require('./models/comments')
const Likes =require('./models/likes')

var cors = require('cors')

const app = express()
const PORT = process.env.PORT
const router = express.Router()


app.use(cors())
app.use(express.json())
app.use(router)
app.use(users)
app.use(tweets)
app.use(Followers)
app.use(Saved_tweets)
app.use(Hidden_tweets)
app.use(Comments)
app.use(Likes)


router.get("/", async (req,res)=>{
    res.send("Hello !");
});

//sign up
router.post("/sign/user",async (req,res)=>{
    const user = new users(req.body)
    try {
        await user.save()
        res.status(201).send({user})

    } catch (e) {
        res.status(400).send(e)
    }
});
//login
router.post("/login/user",async (req,res)=>{
    var _userName = req.body.username;
    var _password = req.body.Password;
    try {
       const l1 = await users.findByPk(_userName);
       if(l1.Password==_password)
        res.send("logged in successfully");
       else res.send("wrong username or password");
    } catch (e) {
        res.status(400).send(e)
    }
});
//add new tweet
router.post("/newTweet",async (req,res)=>{
    const tweet = new tweets(req.body)
    try {
        await tweet.save()
        res.status(201).send({tweet})

    } catch (e) {
        res.status(400).send(e)
    }
});
//delete tweet
router.delete("/deleteTweet/:id",async (req,res)=>{
    const _tweetid = req.params.id
    const count = await tweets.destroy({ where: { id: _tweetid } });
    res.send(`deleted row(s): ${count}`);
});

// update one Tweet
router.put('/updateTweet/:id', async (req, res) => {
    const _tweetid = req.params.id

    const Description = req.body.Description


    const [updatedRows] = await tweets.update(
        {
            Description: Description,
        },
        {
            where: { ID: _tweetid },
        }
    );

    if (updatedRows) {
        res.send(`Updated rows: ${updatedRows}`);
    } else {
        res.send("tweet not found");
    }
})
//get all tweets
router.get("/allTweets", async (req, res) => {
    try {
        const l1 = await tweets.findAll({})
        res.status(200).send(l1)

    } catch (e) {
        res.status(500).send(e)
    }
})
// get user tweets
router.get("/userTweets/:id", async (req, res) => {
    const userid = req.params.id
    const t1 = await tweets.findAll(
        {
            where: { User_Id: userid }
        }
    );
        res.send(t1);
})
//get user information
router.get("/userInfo/:id", async (req, res) => {
    const userid = req.params.id
    const t1 = await users.findAll(
        {
            where: { ID: userid }
        }
    );
    res.send(t1);
})
//edit User Information
router.put('/editUserInfo/:id', async (req, res) => {
    const userid = req.params.id

    const name = req.body.name
    const Birthday = req.body.Birthday
    const Address = req.body.Address

    const [updatedRows] = await users.update(
        {
            name: name,
            Birthday:Birthday,
            Address:Address
        },
        {
            where: { ID: userid },
        }
    );

    if (updatedRows) {
        res.send(`Updated users: ${updatedRows}`);
    } else {
        res.send(" user not found");
    }
})
//change password
router.put('/changePassword/:id', async (req, res) => {
    const userid = req.params.id
    const newpass = req.body.new
    const oldpass = req.body.old


    const [updatedRows] = await users.update(
        {
            Password: newpass
        },
        {
            where: { ID: userid , Password:oldpass },
        }
    );

    if (updatedRows) {
        res.send(`password changed`);
    } else {
        res.send("wrong password");
    }
})
//follow a user
router.post("/followUser",async (req,res)=>{
    const follower = new Followers(req.body)
    try {
        await follower.save()
        res.status(201).send({follower})

    } catch (e) {
        res.status(400).send(e)
    }
});
//unfollow a user
router.delete("/unfollowUser",async (req,res)=>{
    const Followed_Id = req.body.Followed_Id
    const Follower_Id = req.body.Follower_Id

    const count = await Followers.destroy({ where: { Followed_Id: Followed_Id,Follower_Id:Follower_Id } });
    res.send(`deleted row(s): ${count}`);
});
// get user following user tweets
router.get("/userFollowed/:id", async (req, res) => {
    const userid = req.params.id
    const t1= await Followers.findAll(
        {
            where: {Follower_Id: userid}
        }

    );
     var datanew = new Array(t1.length);

     for(let i=0;i<t1.length;i++) {
         datanew[i]=t1[i].Followed_Id;
     }
    var datanew1 = new Array(t1.length);

    for(let i=0;i<datanew.length;i++) {
        datanew1[i]=await tweets.findAll(
            {
                where: {User_Id: datanew[i]}
                  });
    }
    res.send(datanew1);
})
//add tweet to saved tweets
router.post("/saveTweet",async (req,res)=>{
    const ST = new Saved_tweets(req.body)
    try {
        await ST.save()
        res.status(201).send({ST})

    } catch (e) {
        res.status(400).send(e)
    }
});
//delete tweet from saved tweets
router.delete("/deleteFromSaved/:id",async (req,res)=>{
    const tweet_Id = req.params.id

    const count = await Saved_tweets.destroy({ where: { ID: tweet_Id } });
    res.send(`unsaved tweets: ${count}`);
});
module.exports = router
// get the saved tweets
router.get("/getsavedTweet/:id", async (req, res) => {
    const userid = req.params.id
    const t1 = await Saved_tweets.findAll(
        {
            where: { User_Id: userid }
        }
    );
    res.send(t1);
})
// Hide A tweet
router.post("/HideTweet",async (req,res)=>{
    const ST = new Hidden_tweets(req.body)
    try {
        await ST.save()
        res.status(201).send({ST})

    } catch (e) {
        res.status(400).send(e)
    }
});
// unhide a tweet
router.delete("/unhideTweet/:id",async (req,res)=>{
    const tweet_Id = req.params.id

    const count = await Hidden_tweets.destroy({ where: { ID: tweet_Id } });
    res.send(`unhide tweets: ${count}`);
});
//comment on a tweet
router.post("/commentOnTweet",async (req,res)=>{
    const ST = new Comments(req.body)
    try {
        await ST.save()
        res.status(201).send({ST})

    } catch (e) {
        res.status(400).send(e)
    }
});
// get tweet comments
router.get("/getTweetComments/:id", async (req, res) => {
    const tweetid = req.params.id
    const t1 = await Comments.findAll(
        {
            where: { Tweet_Id: tweetid }
        }
    );
    res.send(t1);
})
// delete tweet comment
router.delete("/deleteComment/:id",async (req,res)=>{
    const comment_Id = req.params.id

    const count = await Comments.destroy({ where: { ID: comment_Id } });
    res.send(`deleted comments on tweets: ${count}`);
});
// like a tweet
router.post("/likeTweet",async (req,res)=>{
    const ST = new Likes(req.body)
    try {
        await ST.save()
        res.status(201).send({ST})

    } catch (e) {
        res.status(400).send(e)
    }
});
router.delete("/unlikeTweet/:id",async (req,res)=>{
    const like_Id = req.params.id

    const count = await Likes.destroy({ where: { ID: like_Id } });
    res.send(`deleted likes on tweets: ${count}`);
});
// get tweet likes
router.get("/getTweetlikes/:id", async (req, res) => {
    const tweetid = req.params.id
    const t1 = await Likes.findAll(
        {
            where: { Tweet_Id: tweetid }
        }
    );
    res.send(t1);
})
// get tweet likes count
router.get("/getTweetlikescount/:id", async (req, res) => {
    const tweetid = req.params.id
    const t1 = await Likes.findAll(
        {
            attributes: [
               [sequelize.fn("COUNT", sequelize.col("*")),"count"]
            ],
            where: { Tweet_Id: tweetid }
        }
    );
   // console.log(t1)
    if (!t1.length) {
        return res.status(404).send("No Results Found")
    }
    res.status(200).send(t1)
})


app.listen(PORT, () => {
    console.log("Express server is up and running on port " + PORT)
})
