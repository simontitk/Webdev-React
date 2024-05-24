import { useState } from "react";
import { User, UserErrors } from "../../interfaces/interfaces";

interface ProfileFieldEditorProps {
    name: string,
    field: keyof User,
    editedValues: User,
    errors: UserErrors,
    hideInfo?: boolean,
    handleChange: React.ChangeEventHandler<HTMLInputElement>

}

export default function ProfileFieldEditor({name, field, editedValues, errors, hideInfo=false, handleChange }: ProfileFieldEditorProps) {

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const image = (isEditing) ? "checkbox" : "edit";

    function handleBlur() {
        setTimeout(() => {
            setIsEditing(false)
        }, 150);
    }

    return (
        <div className="profile-field-editor">
            <h3>{name}</h3>
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
                    <span className="profile-info-value profile-info"> { (hideInfo) ? "****" : editedValues[field]} </span>
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