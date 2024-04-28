interface RangeFilterProps {
    unit: React.ReactNode,
    step: number,
    min: number,
    max: number,
    setMin: Function,
    setMax: Function,
}

export default function RangeFilter({unit, step, min, max, setMin, setMax}: RangeFilterProps) {

    return (
        <>
            <span className="range-filter">
                <input 
                    className="filter-input" 
                    type="number" 
                    name={`${unit}-min-input`}
                    min={0} max={max} 
                    id={`${unit}-min-input`}
                    placeholder="From"
                    value={min}
                    step={step}
                    onChange={(event) => setMin(parseFloat(event.target.value))}>
                </input>
                -
                <input 
                    className="filter-input" 
                    type="number" 
                    name={`${unit}-max-input`}
                    min={min} max={1000} 
                    id={`${unit}-max-input`}
                    placeholder="To"
                    value={max}
                    step={step}
                    onChange={(event) => setMax(parseFloat(event.target.value))}>
                </input>
                {unit}
            </span>
        </>
    );
}