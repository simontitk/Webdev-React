import { Category } from "../../interfaces/interfaces";

interface CategoryFilterProps {
    categories: Category[],
    selectedCategories: number[],
    setSelectedCategories: Function
}

export default function CategoryFilter({ categories, selectedCategories, setSelectedCategories }: CategoryFilterProps) {

    function handleChange(id: number): void {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(category => id != category));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        };
    }
    

    return (
        <>
            { categories.map(category => (
                <span key={category.id}>
                    <input 
                        type="checkbox" 
                        name={category.name} 
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleChange(category.id)}>
                    </input>
                    {category.name}
                </span>
            ))}
        </>
    );
}