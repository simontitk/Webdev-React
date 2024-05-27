import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { MessageContext } from "../../GlobalContext";

    interface Errors {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        street?: string;
        city?: string;
        password?: string;
    }

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        password: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const { addMessage} = useContext(MessageContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};

        // Check first name
        if (!formData.first_name) {
            newErrors.first_name = 'First name is required';
        } else if (formData.first_name.length > 15) {
            newErrors.first_name = 'First name must be less than 15 characters';
        }

        // Check last name
        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required';
        } else if (formData.last_name.length > 50) {
            newErrors.last_name = 'Last name must be less than 50 characters';
        }

        // Check email
        const emailCheck = formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailCheck) {
            newErrors.email = 'Email must contain "@" and "."';
        }

        // Check phone
        const phoneNumberMatch = formData.phone.match(/^\d{8}$/);
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required'; 
        } else if (!phoneNumberMatch){
            newErrors.phone = 'Phone number must be 8 digits';
        }

        // Check street
        const houseNumberMatch = formData.street.match(/\d{1,4}.*$/);
        if (!formData.street) {
            newErrors.street = 'Street is required';
        } else if (!houseNumberMatch) {
            newErrors.street = 'Street must contain a house number';
        }

        // Check city
        const zipCodeMatch = formData.city.match(/^\d{4}.*$/);
        if (!formData.city) {
            newErrors.city = 'City is required';
        } else if (!zipCodeMatch) {
            newErrors.city = 'City must start with a zip code (4 digits)';
        }

        // Check password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        // Return whether the form is valid
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, perform form submission logic here
            try {
                // Send a POST request to the server with formData
                const response = await fetch('http://localhost:3000/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    addMessage("Successful registration.", "success");

                }

            } catch (error) {
                // Handle fetch errors
                console.log('Fetch error:', error);
                // Update errors state if necessary
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    serverError: 'An error occurred during registration.',
                }));
            }
            navigate('/login');
        } else {
            addMessage(`Invalid registration form.`, "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="first_name">First name: </label>
            <input className="input" 
                    id="first_name" 
                    name="first_name"
                    type="text" 
                    value={formData.first_name}
                    onChange={handleChange} 
                    placeholder="Enter first name"/>
            {errors.first_name && <div style={{ color: 'red' }}>{errors.first_name}</div>}

            <label htmlFor="last_name">Last name: </label>
            <input className="input" 
                    id="last_name" 
                    name="last_name" 
                    type="text" 
                    value={formData.last_name}
                    onChange={handleChange} 
                    placeholder="Enter last name"/>
            {errors.last_name && <div style={{ color: 'red' }}>{errors.last_name}</div>}

            <label htmlFor="email">Email address: </label>
            <input className="input" 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter email address"/>
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

            <label htmlFor="phone">Phone number: </label>
            <input className="input" 
                    id="phone" 
                    name="phone" 
                    type="text" 
                    value={formData.phone}
                    onChange={handleChange} 
                    placeholder="Enter phone number"/>
            {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}

            <label htmlFor="city">City: </label>
            <input className="input" 
                    id="city" 
                    name="city" 
                    type="text" 
                    value={formData.city}
                    onChange={handleChange} 
                    placeholder="Enter city"/>
            {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}

            <label htmlFor="street">Street: </label>
            <input className="input" 
                    id="street" 
                    name="street" 
                    type="text" 
                    value={formData.street}
                    onChange={handleChange} 
                    placeholder="Enter street name"/>
            {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}

            <label htmlFor="password">Password: </label>
            <input className="input" 
                    id="password" 
                    name="password" 
                    type="password"
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Enter password"/>
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

            <button type="submit" className = "button">
                Create account
            </button>
        </form>
    );
}