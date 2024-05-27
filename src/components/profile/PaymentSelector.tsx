import { User } from "../../interfaces/interfaces";

interface PaymentSelectorProps {
    editedValues: User,
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
}

export default function PaymentSelector({ editedValues, handleChange}: PaymentSelectorProps) {
    
    return (
        <div className="profile-field-editor">
            <h3>Payment method</h3>
            <div className="profile-info-display">
            <select 
                className="profile-info-input profile-info"
                name="payment_method"
                onChange={handleChange} 
                value={editedValues.payment_method}>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Mobilpay">Mobilpay</option>
            </select>
            </div>
        </div>
    );
}