import { useState } from "react";
import { User } from "../../interfaces/interfaces";
import ProfileEditor from "./ProfileEditor";

interface ProfileDisplayProps {
    user: User
}

interface Errors {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        street?: string;
        city?: string;
        password?: string;
}

export default function ProfileDisplay({ user }: ProfileDisplayProps) {


    const [editedValues, setEditedValues] = useState<User>({...user});
    const [errors, setErrors] = useState<Errors>({});



    /*function submitChanges*/
    const submitChanges = async(e: React.FormEvent) => {
        /**
         * send put request to the api endpoint with editedvalues.id as a parameter and 
         */
        e.preventDefault();
        try {
            // Send a POST request to the server with editedValues
            const response = await fetch(`http://localhost:3000/users/${editedValues.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedValues),
                });

                // Check if the request was successful
            if (response.ok) {
                // Optionally handle success
            console.log('Changes submitted successfully');
            } else {
                // If the request fails, throw an error
            throw new Error('Failed to submit changes');
            }

        } catch (error) {
            // Handle fetch errors
            console.log('Fetch error:', error);
            // Update errors state if necessary
            setErrors((prevErrors) => ({
                ...prevErrors,
                serverError: 'An error occurred changing information, please try again',
                }));
            }
    }

    function resetChanges() {
        const result = window.confirm("Are you sure you want to discard all changes?");
        if (result) setEditedValues(user);
    }


    return (
            <div className="center-panel">  

                <ProfileEditor editedValues={editedValues} setEditedValues={setEditedValues}>
                </ProfileEditor>

                <div className="profile-buttons">
                    <button className="button" onClick={submitChanges}>Save changes</button>
                    <button className="button" onClick={resetChanges}>Reset changes</button>
                </div>



            </div>
    );
}