import ProfileFieldEditor from "./ProfileFieldEditor";
import { useContext, useState } from "react";
import { User, UserErrors } from "../../interfaces/interfaces";
import Cookies from "js-cookie";
import { UserContext } from "../../GlobalContext";
import PaymentSelector from "./PaymentSelector";


interface ProfileEditorProps {
    user: User,
}

export default function ProfileEditor({ user }: ProfileEditorProps) {

    const [editedValues, setEditedValues] = useState<User>({...user});
    const [errors, setErrors]= useState<UserErrors>({});
    const {setUser} = useContext(UserContext);


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const name = e.target.name;
        const value = e.target.value;
        setEditedValues({...editedValues, [name]: value});
    }

    function validate() {
        const newErrors: UserErrors = {};
        if (editedValues.first_name.length > 15 || editedValues.first_name.length < 1)
            newErrors.first_name = "First name must be between 1 and 15 characters."
        if (!editedValues.last_name)
            newErrors.last_name = "Last name cannot be empty."
        if (! /^.+@.+\..+$/.test(editedValues.email))
            newErrors.email = "Invalid email."
        if (! /^\d{8}$/.test(editedValues.phone))
            newErrors.phone = "Phone number must be 8 digits."
        if (! /^\d{4}.+$/.test(editedValues.city))
            newErrors.city = "City must start with a zipcode (4 digits)."
        if (! /^(?=.*[A-Za-z])(?=.*\d).+$/.test(editedValues.street))
            newErrors.street = "Address must contain a house number."
        if (editedValues.password.length < 1) 
            newErrors.password = "Password cannot be empty."
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    async function submitChanges() {
        const isValid = validate();
        if (isValid) {
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
    }


    function resetChanges() {
        const result = window.confirm("Are you sure you want to discard all changes?");
        if (result) {
            setEditedValues(user);
            setErrors({});
        }
    }
    

    return (
        <section className="profile-editor">
            <div className="editor-container">
                <div className="profile-data-editor">
                    <h1>Personal information</h1>
                    <ProfileFieldEditor
                        name={"First name"} 
                        field={"first_name"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>
                    <ProfileFieldEditor
                        name={"Last name"} 
                        field={"last_name"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>
                    <ProfileFieldEditor
                        name={"Email"} 
                        field={"email"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>
                    <ProfileFieldEditor
                        name={"Phone number"} 
                        field={"phone"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>
                    <ProfileFieldEditor
                        name={"City"} 
                        field={"city"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>
                    <ProfileFieldEditor
                        name={"Street address"} 
                        field={"street"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>     
                </div>

                <div className="profile-data-editor">
                    <h1>Profile settings</h1>

                    <ProfileFieldEditor
                        hideInfo={true}
                        name={"Password"} 
                        field={"password"}
                        editedValues={editedValues} 
                        errors={errors}
                        handleChange={handleChange}>
                    </ProfileFieldEditor>
                    <PaymentSelector 
                        handleChange={handleChange}
                        editedValues={editedValues}>
                    </PaymentSelector>
                </div>
            </div>       
            <div className="profile-buttons">
                <button className="button" onClick={submitChanges}>Save changes</button>
                <button className="button" onClick={resetChanges}>Reset changes</button>
            </div>
        </section>
    );
}