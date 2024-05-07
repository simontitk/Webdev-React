import { useContext, useState } from "react"
import Cookies from "js-cookie";
import { UserContext } from "../../GlobalContext";
import { useNavigate } from 'react-router-dom';

interface Errors {
    email?: string;
    password?: string;
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
        const newErrors: Errors = {};

        if (!email) {
            alert('Please enter an email');
            return;
        }
        fetch("http://localhost:3000/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email, "password": password})
        })
        .then(res => res.json())
        .then(data => {
            if (data.password === password) {
                if (data) {
                    Cookies.set("user", JSON.stringify(data), {expires: 7, path: ""});
                    setUser(data);
                    navigate('/');
                } else {
                    newErrors.password = 'Password incorrect'
                } 
            } else {
                newErrors.email = 'Please enter a valid email'
            }
            setErrors(newErrors);
        })
        .catch(err => {
            console.log(err);
        });
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser();
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">Email address: </label>
            <input className="input" 
                    id="email" 
                    type = "email" 
                    value={email} 
                    onChange={onChangeEmail} 
                    placeholder="Enter email address"/>
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            
            <label htmlFor="password">Password: </label>
            <input className="input" 
                    id="password" 
                    type="password"
                    value={password} 
                    onChange={onChangePassword} 
                    placeholder="Enter password"/>
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

            <button type="submit" className = "button">
                Login
            </button>
        </form>
    );
}