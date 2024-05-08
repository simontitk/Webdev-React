

export default function ProfileDisplay() {

    

    return (
                <div className="center-panel">  
            <h1 id="Privacy">Privacy</h1>
            <h2>Account Information</h2>
            <div className="displayUsername">
            <p className="notH3">Username: </p> <p className="infoDisplay"><span id="username-display"></span></p>
            </div>
            <p className="notH3">Email Address: </p> <p className="infoDisplay"><span id="email-display"></span></p>
            <p className="notH3">Phone Number: </p> <p className="infoDisplay"><span id="phonenumber-display"></span></p>
            <p className="notH3">Password: </p> <label className="checkbox">
            Reveal password <input type="checkbox" id="toggleCheckbox"/>
            </label> <p className="infoDisplay"><span id="password-display"></span></p>
            <p className="notH3"><label htmlFor="cars">Payment Method: </label> <br />

            <select name="payment" className="select" id="PaymentMethods">
                <option className="optionText" value="optionText">Select Payment Method &Darr;</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">Paypal</option>
                <option value="mobilepay">MobilePay</option>
            </select></p>

            <h2>User Information</h2>
            <p className="notH3">First name:</p> <p className="infoDisplay"><span id="firstname-display"></span></p>
            <p className="notH3">Last name: </p> <p className="infoDisplay"><span id="lastname-display"></span></p>
            <p className="notH3">City: </p> <p className="infoDisplay"><span id="city-display"></span></p>
            <p className="notH3">Home Address: </p> <p className="infoDisplay"><span id="address-display"></span></p>


            <h1 id="ChangeInfo-Profile">Change Information</h1>
                <form action="profile.html">
                    <label htmlFor="fname">First name:</label><br />
                    <input type="text" id="firstName" name="fname" value="" /><br />
                
                    <label htmlFor="lname">Sirname:</label><br />
                    <input type="text" id="lastName" name="lname" value="" /><br />
                
                    <label htmlFor="username">Username:</label> <br />
                    <input type="text" id="userName" value="" /><br />
                
                    <label htmlFor="email">Email:</label> <br />
                    <input type="text" id="email" name="email" value="" /><br />
                
                    <label htmlFor="phonenumber">Phone Number:</label> <br />
                    <input type="text" id="phoneNumber" name="phonenumber" value="" /><br />
                
                    <label htmlFor="password">Password: </label> <br />
                    <input type="password" id="password" name="password" value=""/><br />
                
                    <label htmlFor="addressHome">Address: </label> <br />
                    <input type="text" id="address" name="addressHome" value="" /><br />
                
                    <label htmlFor="city">City: </label> <br />
                    <input type="text" id="city" name="ciy" value="" /><br /><br />
                
                    <input className="button" type="submit" value="Submit" id="submit-user-info-changes" />
                </form>
        </div>
    );
}