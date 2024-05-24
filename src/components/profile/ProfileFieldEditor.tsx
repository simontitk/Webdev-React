import { useState } from "react";
import { User, UserErrors } from "../../interfaces/interfaces";

interface ProfileFieldEditorProps {
    name: string,
    field: keyof User,
    editedValues: User,
    errors: UserErrors,
    handleChange: React.ChangeEventHandler<HTMLInputElement>

}

export default function ProfileFieldEditor({name, field, editedValues, errors, handleChange }: ProfileFieldEditorProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const image = (isEditing) ? "checkbox" : "edit";

    function handleBlur() {
        setTimeout(() => {
            setIsEditing(false)
        }, 150);
    }

    return (
        <div className="profile-field-editor">
            <h2>{name}</h2>
            <div className="profile-info-display">
                {isEditing ? 
                    <input 
                        autoFocus
                        className="profile-info-input profile-info"
                        type="text" 
                        value={editedValues[field]} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        name={field}>
                    </input>
                        : 
                    <span className="profile-info-value profile-info"> { editedValues[field] } </span>
                }
                <img src={`icons/${image}.png`} width={30} height={30} onClick={()=>setIsEditing(true)} />
            </div>
            {errors[field] && 
                <div className="profile-error-display">
                    {errors[field]}
                </div>
            }
        </div>
    );
}