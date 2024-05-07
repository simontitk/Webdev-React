import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../GlobalContext";

interface Errors {
    message?: string;
}

export default function LoginForm() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<Errors>({});

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();


    const loginUser = () => {
        fetch("http://localhost:3000/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "email": email, "password": password })
        })
            .then(res => {
                switch (res.status) {
                    case 200: return res.json()
                    case 401: throw new Error("Invalid password");
                    case 404: throw new Error("Invalid email");
                    default: throw new Error("Unknown error")
                }
            })
            .then(data => {
                console.log(data)
                setUser(data);
                Cookies.set("user", JSON.stringify(data), { expires: 7, path: "" });
                navigate('/');
            })
            .catch(err => setErrors({ message: err.message }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser();
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">Email address: </label>
            <input className="input"
                id="email"
                type="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="Enter email address" />

            <label htmlFor="password">Password: </label>
            <input className="input"
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                placeholder="Enter password" />
            {errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}

            <button type="submit" className="button">
                Login
            </button>
        </form>
    );
}