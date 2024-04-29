import { Link } from "react-router-dom"

interface CategoryCardProps {
    name: string,
    description: string
}

export default function CategoryCard({name, description}: CategoryCardProps) {

    return (
        <div className={`category-card`} style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url("http://localhost:3000/images/categories/${name}.jpg")`,
                backgroundPosition: "center center"
        }}>
            <div className="category-name"> 
                {name} 
            </div>
            <div className="category-description"> 
                {description} 
            </div>
        </div>
    );
}