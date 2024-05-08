import { useState } from "react";
import { User } from "../../interfaces/interfaces";

interface ProfileFieldEditorProps {
    name: string,
    field: keyof User,
    editedValues: User,
    handleChange: React.ChangeEventHandler<HTMLInputElement>

}

export default function ProfileFieldEditor({name, field, editedValues, handleChange }: ProfileFieldEditorProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const image = (isEditing) ? "checkbox" : "edit";

    return (
        <div className="profile-field-editor">
            <h2>{name}</h2>
            <div className="profile-info-display">
                {isEditing ? 
                    <input 
                        className="profile-info-input profile-info"
                        type="text" 
                        value={editedValues[field]} 
                        onChange={handleChange} 
                        name={field}>
                    </input>
                        : 
                    <span className="profile-info-value profile-info"> { editedValues[field] } </span>
                }
                <img src={`icons/${image}.png`} width={30} height={30} onClick={()=>setIsEditing(!isEditing)}/>
            </div>
        </div>
    );
}