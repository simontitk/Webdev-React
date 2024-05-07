
export default function ProfileNavigation() {

return (
        
        <div className="profile-left-panel">
            <div className="left-panel" id="left-panel-profile">
                <h1>Greetings, <span id="usernameHeading-profile"></span></h1>
                <section>
                    <h2><a href="#Privacy">Privacy</a></h2>
                    <ul className="Profile-index">
                        <li className="Profile-subindex">Account Information</li>
                        <li>Personal Information</li>
                    </ul>
                    <h2><a href="#ChangeInfo-Profile">Change Information</a></h2>
                </section>
            </div>
        </div>

    );
}