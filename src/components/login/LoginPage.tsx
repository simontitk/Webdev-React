import { Link } from "react-router-dom";
import "./login.css";
import LoginForm from "./LoginForm";

export default function LoginPage() {

    return (
        <>
        <div className="left-panel"></div>
        <div className="center-panel">
            <h1 className="welcome-header">Welcome back!</h1>
            <h2 className="login-header">Login to your account</h2>
            <LoginForm> 
            </LoginForm>
            <h2 className="login-header">Are you new here?</h2>
            <Link to={"/register"}>
                <button className="button">
                    Create account
                </button>
            </Link>
        </div>
        <div className="right-panel"></div>
        </>
    );
}