import { useState } from "react";
import { User } from "../../interfaces/interfaces";
import ProfileEditor from "./ProfileEditor";

interface ProfileDisplayProps {
    user: User
}

export default function ProfileDisplay({ user }: ProfileDisplayProps) {


    const [editedValues, setEditedValues] = useState<User>({...user});


    function submitChanges() {
        /**
         * send put request to the api endpoint with editedvalues.id as a parameter and 
         */
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