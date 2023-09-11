import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = function () {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      console.log("at front end:");
      console.log(data);
      if (data.err_msg) {
        alert(data.err_msg);
      } else {
        alert(data.msg);
        navigate("/dashboard");
        localStorage.setItem("_id", data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    loginUser();
    console.log({ email, password });
    setEmail("");
    setPassword("");
  }
  return (
    <main className="login">
      <h1 className="login-title">login into your account</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button className="login-button">Sign in </button>
        <p>
          Dont have account <Link to="/register">create account</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
