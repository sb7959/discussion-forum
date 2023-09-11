import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Replies = function () {
  const [reply, setReply] = React.useState("");
  const [replyList, setReplyList] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const createReply = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/create/reply", {
        method: "POST",
        body: JSON.stringify({
          id,
          userId: localStorage.getItem("_id"),
          reply,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      alert(data.msg);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    createReply();
    setReply("");
  }

  useEffect(() => {
    const displayReplies = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/thread/replies", {
          method: "POST",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        setReplyList(data.replies);
        setTitle(data.title);
      } catch (error) {
        console.log(error);
      }
    };

    displayReplies();
  }, [id]);
  return (
    <main className="replies">
      <form className="modal_content" onSubmit={handleSubmit}>
        <label htmlFor="reply"> reply to thread</label>
        <textarea
          rows={5}
          type="text"
          name="reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="modalInput"
        />
        <button className="modalBtn">send</button>
      </form>
      <div className="thread_container">
        {replyList.map((reply) => (
          <div className="thread_item">
            <p>{reply.text}</p>
            <div className="react_container">
              <p>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Replies;
