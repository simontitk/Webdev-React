import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../GlobalContext";
import ProfileDisplay from "./ProfileDisplay";
import ProfileNavigation from "./ProfileNavigation";
import "./profile.css";

export default function ProfilePage() {

    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to='/login' replace={true} ></Navigate>
    } 
    
    else {
        return (
            <> 
                <ProfileNavigation></ProfileNavigation>
                <ProfileDisplay user={user}></ProfileDisplay>
                <div className="right-panel" id="right-panel-profile">
                </div>
            </>
        );
    }
}