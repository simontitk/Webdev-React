import { useState } from "react"
import { useNavigate } from 'react-router-dom';

    interface Errors {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        street?: string;
        city?: string;
        password?: string;
    }

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        password: '',
    });

    const [errors, setErrors] = useState<Errors>({});

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
        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.length > 15) {
            newErrors.firstName = 'First name must be less than 15 characters';
        }

        // Check last name
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.length > 50) {
            newErrors.lastName = 'Last name must be less than 50 characters';
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
                await fetch('http://localhost:3000/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

            } catch (error) {
                // Handle fetch errors
                console.log('Fetch error:', error);
                // Update errors state if necessary
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    serverError: 'An error occurred during registration.',
                }));
            }
            console.log('Form submitted with:', formData);
            navigate('/login');
        } else {
            console.log('Form contains errors:', errors);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="firstName">First name: </label>
            <input className="input" 
                    id="firstName" 
                    name="firstName"
                    type="text" 
                    value={formData.firstName}
                    onChange={handleChange} 
                    placeholder="Enter first name"/>
            {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}

            <label htmlFor="lastName">Last name: </label>
            <input className="input" 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    value={formData.lastName}
                    onChange={handleChange} 
                    placeholder="Enter last name"/>
            {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}

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