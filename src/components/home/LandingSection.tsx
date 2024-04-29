import { Link } from "react-router-dom";

export default function LandingSection() {

    return (
        <section className="landing-section">
            <Link to="/all_products">
                <section className="campaign">Get Hydrated Today!</section>
            </Link>
        </section>
    );
}