import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router";
import {useNavigate} from 'react-router-dom';
import Dashboard from "./components/Dashboard";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={EntryPage}/>
        <Route path="/Dashboard" element={Dashboard}/>
      </Routes>
    </div>
  );
}

const Login = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://ieti-lab-user-endpoint.herokuapp.com/")
      .then((response) => {
        // Just an example, it actually should set this token into a localStorage variable or some kind of global state.
        console.log(response);
        localStorage.setItem("accessToken", response.token);
        setToken(response.token);
        // Once the user have been authenticated the app will navigate to the landing page
        navigate("/Dashboard")
      })
  }, [])
}

const { Component } = React;

class EntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "logIn"
    };
  }

  changeView = (view) => {
    this.setState({
      currentView: view
    });
  };

  currentView = () => {
    switch (this.state.currentView) {
      case "signUp":
        return (
          <form>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" id="username" required />
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" required />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Have an Account?
            </button>
          </form>
        );
        
      case "logIn":
        return (
          <form>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" id="username" required />
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" required />
                </li>
                <li>
                  <i />
                  <a onClick={() => this.changeView("PWReset")} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={() => this.changeView("signUp")}>
              Create an Account
            </button>
          </form>
        );
        
      case "PWReset":
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => this.changeView("logIn")}>
              Go Back
            </button>
          </form>
        );
      default:
        break;
    }
  };

  render() {
    return <section id="entry-page">{this.currentView()}</section>;
  }
}

export default EntryPage;
