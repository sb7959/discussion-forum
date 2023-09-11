import React, { useEffect } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";

const Home = function () {
  const navigate = useNavigate();
  const [thread, setThread] = React.useState("");
  const [threadList, setThreadList] = React.useState([]);

  const createThread = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/create/thread", {
        method: "POST",
        body: JSON.stringify({ thread, userId: localStorage.getItem("_id") }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      alert(data.msg);
      setThreadList(data.threads);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(thread);
    createThread();
    setThread("");
  }

  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        const displayThreads = async () => {
          try {
            const res = await fetch("http://localhost:4000/api/all/threads");
            const data = await res.json();
            setThreadList(data.threads);
          } catch (error) {
            console.log(error);
          }
        };
        displayThreads();
        console.log("user has been authenticated");
      }
    };
    checkUser();
  }, [navigate]);
  return (
    <>
      <Nav />
      <main className="home">
        <h2>create thread</h2>
        <form className="home-form" onSubmit={handleSubmit}>
          <div className="home_container">
            <label htmlFor="thread">thread description</label>
            <input
              type="text"
              name="thread"
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <button className="home-button">create thread</button>
        </form>
        <div className="thread_container">
          {threadList.map((thread) => {
            return (
              <div className="thread_item" key={thread.id}>
                <p>{thread.title}</p>
                <div className="react_container">
                  <Likes
                    numberOfLikes={thread.likes.length}
                    threadId={thread.id}
                  />
                  <Comments
                    numberOfComments={thread.replies.length}
                    threadId={thread.id}
                    title={thread.title}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
