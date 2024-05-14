import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../GlobalContext";
import Cookies from 'js-cookie';


export default function Header() {

    function logout() {
        Cookies.remove("user", {path: ""})
        setUser(null);
        setCart([]);
    }

    const [isToggled, setIsToggled] = useState<boolean>(true);
    const { user, setUser } = useContext(UserContext);
    const { setCart }= useContext(CartContext);

    return (
        <header className="header-container">
            <button id="header-hamburger" onClick={() => setIsToggled(!isToggled)}>&#9776;</button>
            <div className="header-logo"><Link to="/">HydroHomies</Link></div>
            <div className={`header-lists ${isToggled ? "hidden" : ""}`}>
                <ul className="header-links">
                    <li><Link to="/all_products">Products</Link></li>
                    <li><a href="#footer">Contact</a></li>
                </ul>
                <ul className="header-links">
                    <li id="header-name"><span>{user && `Hello, ${user.first_name}`}</span></li>
                    <li><Link to={user ? './profile' : './login'}><img src="/icons/profile.png" alt="profile-picture" height="36px"></img><span className="header-button-label"> &nbsp; Profile</span></Link></li>
                    <li><Link to="./cart"><img src="/icons/shopping-cart.png" alt="shopping-cart-picture" height="36px" ></img><span className="header-button-label"> &nbsp; Cart</span></Link></li>
                    {user && <li><Link to="/" id="logout-button"><img onClick={logout} src="/icons/exit.png" alt="exit-picture" height="36px"></img><span className="header-button-label"> &nbsp; Logout</span></Link></li>}
                </ul>
            </div>
        </header>
    );
}