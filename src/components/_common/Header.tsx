import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
    userName: string,
    isLoggedIn: boolean
}

export default function Header({userName, isLoggedIn}: HeaderProps) {

    const [isToggled, setIsToggled] = useState<boolean>(true);

    return (
        <header className="header-container">
            <button id="header-hamburger" onClick={() => setIsToggled(!isToggled)}>&#9776;</button>
            <div className="header-logo"><Link to="/">HydroHomies</Link></div>
            <div className={`header-lists ${isToggled ? "hidden" : ""}`}>
                <ul className="header-links">
                    <li><Link to="/all_products">Products</Link></li>
                    <li><Link to="#footer">Contact</Link></li>
                </ul>
                <ul className="header-links">
                    <li id="header-name"><span>{userName && `Hello, ${userName}`}</span></li>
                    <li><Link to={isLoggedIn ? './profile' : './login'}><img src="icons/profile.png" alt="profile-picture" height="36px"></img><span className="header-button-label"> &nbsp; Profile</span></Link></li>
                    <li><Link to="./cart"><img src="icons/shopping-cart.png" alt="shopping-cart-picture" height="36px" ></img><span className="header-button-label"> &nbsp; Cart</span></Link></li>
                    { isLoggedIn && <li><Link to="/" id="logout-button"><img src="icons/exit.png" alt="exit-picture" height="36px"></img><span className="header-button-label"> &nbsp; Logout</span></Link></li>}
                </ul>
            </div>
        </header>
    );
}