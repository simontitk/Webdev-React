import { useContext, useState } from "react";
import { User } from "../../interfaces/interfaces";
import ProfileEditor from "./ProfileEditor";
import Cookies from "js-cookie";
import { UserContext } from "../../GlobalContext";
import OrderDisplay from "../orders/OrderDisplay";


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
    const {setUser} = useContext(UserContext);


    const submitChanges = async (e: React.FormEvent) => {
        // validation maybe?
        fetch(`http://localhost:3000/users/${editedValues.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(editedValues),
        })
        .then(respone => respone.json())
        .then(data => {
            setUser(data["user"])
            Cookies.set("user", JSON.stringify(data["user"]), { expires: 7, path: "" });
            alert(data["message"])
        })
        .catch(err => console.log(err));
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
                
                <OrderDisplay>
                </OrderDisplay>

            </div>
    );
}