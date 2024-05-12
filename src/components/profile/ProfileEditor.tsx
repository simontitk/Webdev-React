import { User } from "../../interfaces/interfaces";
import ProfileFieldEditor from "./ProfileFieldEditor";


interface ProfileEditorProps {
    editedValues: User,
    setEditedValues: Function
}

export default function ProfileEditor({editedValues, setEditedValues}: ProfileEditorProps) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;
        setEditedValues({...editedValues, [name]: value});
    }
    
    return (
        <section className="profile-editor">
            <ProfileFieldEditor
                name={"First name"} 
                field={"first_name"}
                editedValues={editedValues} 
                handleChange={handleChange}>
            </ProfileFieldEditor>
            <ProfileFieldEditor
                name={"Last name"} 
                field={"last_name"}
                editedValues={editedValues} 
                handleChange={handleChange}>
            </ProfileFieldEditor>
            <ProfileFieldEditor
                name={"Email"} 
                field={"email"}
                editedValues={editedValues} 
                handleChange={handleChange}>
            </ProfileFieldEditor>
            <ProfileFieldEditor
                name={"Phone number"} 
                field={"phone"}
                editedValues={editedValues} 
                handleChange={handleChange}>
            </ProfileFieldEditor>
            <ProfileFieldEditor
                name={"City"} 
                field={"city"}
                editedValues={editedValues} 
                handleChange={handleChange}>
            </ProfileFieldEditor>
            <ProfileFieldEditor
                name={"Street address"} 
                field={"street"}
                editedValues={editedValues} 
                handleChange={handleChange}>
            </ProfileFieldEditor>
        </section>
    );
}