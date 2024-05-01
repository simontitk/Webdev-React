import { Link } from "react-router-dom";
import "./register.css";
import RegistrationForm from "./RegistrationForm";

export default function RegisterPage() {

    /**
     * useState declarations
     */

    /**
     * helper function declarations
     */

    /**
     * fetching within useEffects
     */


    /**
     * return jsx
     */


    return (
        <>
        <div className="left-panel"></div>
        <div className="center-panel">
            <h1>Welcome!</h1>
            <h2>Create an account</h2>
            <RegistrationForm>
            </RegistrationForm>
            <h2>Already have an account?</h2>
            <Link to={"/login"}>
                <button className="button">
                    Login
                </button>
            </Link>

        </div>
        <div className="right-panel"></div>
        </>

    );
}