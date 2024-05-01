import { useState } from "react"


export default function LoginForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [password, setPassword] = useState("")

    const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }

    const onChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStreet(e.target.value);
    }

    const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
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
            <label htmlFor="firstName">First name: </label>
            <input className="input" 
                    id="firstName" 
                    type="text" 
                    value={firstName}
                    onChange={onChangeFirstName} 
                    placeholder="Enter first name">
            </input>
            <label htmlFor="lastName">Last name: </label>
            <input className="input" 
                    id="lastName" 
                    type="text" 
                    value={lastName}
                    onChange={onChangeLastName} 
                    placeholder="Enter last name">
            </input>
            <label htmlFor="email">Email address: </label>
            <input className="input" 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={onChangeEmail} 
                    placeholder="Enter email address">
            </input>
            <label htmlFor="phone">Phone number: </label>
            <input className="input" 
                    id="phone" 
                    type="text" 
                    value={phone}
                    onChange={onChangePhone} 
                    placeholder="Enter phone number">
            </input>
            <label htmlFor="city">City: </label>
            <input className="input" 
                    id="city" 
                    type="text" 
                    value={city}
                    onChange={onChangeCity} 
                    placeholder="Enter city">
            </input>
            <label htmlFor="street">Street: </label>
            <input className="input" 
                    id="street" 
                    type="text" 
                    value={street}
                    onChange={onChangeStreet} 
                    placeholder="Enter street name">
            </input>
            <label htmlFor="password">Password: </label>
            <input className="input" 
                    id="password" 
                    type="password"
                    value={password} 
                    onChange={onChangePassword} 
                    placeholder="Enter password">
            </input>
            <button type="submit" className = "button">
                Create account
            </button>
        </form>
    );
}