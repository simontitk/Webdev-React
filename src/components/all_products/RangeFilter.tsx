interface RangeFilterProps {
    minName: string,
    maxName: string,
    unit: React.ReactNode,
    step: number,
    min: number,
    max: number,
    setValue: Function
}

export default function RangeFilter({minName, maxName, unit, step, min, max, setValue}: RangeFilterProps) {

    return (
        <>
            <span className="range-filter">
                <input 
                    className="filter-input" 
                    type="number" 
                    name={minName}
                    min={0} max={max} 
                    id={`${unit}-min-input`}
                    placeholder="From"
                    value={min}
                    step={step}
                    onChange={(event) => setValue(event)}>
                </input>
                -
                <input 
                    className="filter-input" 
                    type="number" 
                    name={maxName}
                    min={min} max={5000} 
                    id={`${unit}-max-input`}
                    placeholder="To"
                    value={max}
                    step={step}
                    onChange={(event) => setValue(event)}>
                </input>
                {unit}
            </span>
        </>
    );
}