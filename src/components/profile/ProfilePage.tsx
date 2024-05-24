import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import "./profile.css";
import ProfileEditor from "./ProfileEditor";
import OrderDisplay from "../orders/OrderDisplay";

export default function ProfilePage() {

    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to='/login' replace={true} ></Navigate>
    } 
    
    else {
        return (
            <> 
                <div className="left-panel">
                </div>
                <div className="center-panel">  
                    <ProfileEditor user={user}>
                    </ProfileEditor>
                    <OrderDisplay>
                    </OrderDisplay>
                </div>
                <div className="right-panel">
                </div>
            </>
        );
    }
}