const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const port = process.env.PORT || 4000;

//extra

//storing users in array

const users = [];

//storing all the threads

const threadList = [];

//generating random id:

const generateID = () => Math.random().toString(36).substring(2, 10);
app.use(express.json());
app.use(cors());

//register
app.post("/api/user/register", async (req, res) => {
  const { email, username, password } = req.body;
  const id = generateID();

  const result = users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length === 0) {
    const newUser = { id, email, password, username };
    users.push(newUser);
    return res
      .status(200)
      .json({ newUser, msg: "account created successfully" });
  }
  res.json({ err_msg: "account already exist" });
});

//login
app.post("/api/user/", (req, res) => {
  const { email, password } = req.body;
  console.log("request recieved");
  console.log(req.body);
  const result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //console.log("at back end");
  console.log(result);
  if (result.length === 0) {
    return res.json({ err_msg: "incorrect credentials" });
  }
  res.json({ msg: "login successfully", id: result[0].id });
});

//create threads
app.post("/api/create/thread", async (req, res) => {
  const { thread, userId } = req.body;
  const threadId = generateID();
  console.log({ thread, userId, threadId });
  threadList.unshift({
    id: threadId,
    title: thread,
    userId,
    replies: [],
    likes: [],
  });
  res.json({ msg: "thread created successfully", threads: threadList });
});

//retrieve all threads

app.get("/api/all/threads", (req, res) => {
  res.json({ threads: threadList });
});

//like the thread
app.post("/api/thread/like", (req, res) => {
  const { threadId, userId } = req.body;
  const result = threadList.filter((thread) => thread.id === threadId);
  /* this scenario is not possible 
 if (result.length === 0) {
  }*/
  const likeArray = result[0].likes;
  console.log(likeArray);
  const checkLikeUser = likeArray.filter((user) => user === userId);
  if (checkLikeUser.length === 0) {
    likeArray.push(userId);
    console.log(result[0].likes);
    return res.json({ msg: "you reacted to the post" });
  }
  res.json({ err_msg: "you can react only once" });
});

//display all replies
app.post("/api/thread/replies", (req, res) => {
  const { id } = req.body;
  const result = threadList.filter((thread) => thread.id === id);
  res.json({
    replies: result[0].replies,
    title: result[0].title,
  });
});

//create a reply
app.post("/api/create/reply", (req, res) => {
  const { id, userId, reply } = req.body;
  const result = threadList.filter((thread) => thread.id === id);
  const userReply = users.filter((user) => user.id === userId);
  console.log("prinitng reply object");
  console.log(userReply);
  result[0].replies.unshift({
    userId: userReply[0].id,
    name: userReply[0].username,
    text: reply,
  });
  res.json({ msg: "response added successfully" });
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
