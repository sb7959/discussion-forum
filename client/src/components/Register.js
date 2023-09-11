import React from "react";
import { useNavigate } from "react-router-dom";

const Register = function () {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  async function signup() {
    try {
      const res = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          username,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.err_msg) {
        alert(data.err_msg);
      } else {
        alert("account created successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ username, email, password });
    signup();
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <main className="register">
      <h1>create account</h1>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">email</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button">register</button>
      </form>
    </main>
  );
};

export default Register;
