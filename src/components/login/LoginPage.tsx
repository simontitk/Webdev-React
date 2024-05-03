import { useContext, useState } from "react";
import "./login.css";

import Cookies from "js-cookie";
import { UserContext } from "../../GlobalContext";
import { User } from "../../interfaces/interfaces";

export default function LoginPage() {

    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');

    /**
     * useState declarations
     */

    /**
     * helper function declarations
     */

    // Function to login a user

    const loginUser = () => {
        if (!email) {
            alert('Please enter an email');
            return;
        }
        fetch(`http://localhost:3000/users/?email=${email}`)
            .then(response => response.json())
            .then((data: User) => {
                if (data) {
                    Cookies.set('email', email, { expires: 7, path: '' });
                    setUser(data);
                } else {
                    alert('Please enter a valid email');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Function to logout a user
    const logoutUser = () => {
        Cookies.remove('email', { path: '' });
        setUser(null);
    };

    /**
     * fetching within useEffects
     */


    /**
     * return jsx
     */


    return (
        <>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <button onClick={loginUser}>Log In</button>
            <button onClick={logoutUser}>Log Out</button>
        </>

    );
}