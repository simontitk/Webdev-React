import { useState } from "react"


export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert(`Form submitted with: ${email}`);
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">Email address: </label>
            <input className="input" id="email" type = "email" value={email} onChange={onChangeEmail} placeholder="Enter email address"></input>
            <label htmlFor="password">Password: </label>
            <input className="input" 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={onChangePassword} 
                    placeholder="Enter password"></input>
            <label htmlFor="check">Show Password</label>
            <input
                id="check"
                type="checkbox"
                value={showPassword}
                onChange={() =>
                    setShowPassword((prev) => !prev)}/>
            <button type="submit" className = "button">
                Login
            </button>
        </form>
    );
}