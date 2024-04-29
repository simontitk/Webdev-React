import { useState } from "react";

interface FilterContainerProps {
    name: string,
    children: React.ReactNode
}

export default function FilterContainer({ name, children }: FilterContainerProps) {

    const [isToggled, setIsToggled] = useState<boolean>(false);

    return (
        <div className="filter-container">

            <div className="filter-header" onClick={() => setIsToggled(!isToggled)}>
                {name}
                <span className={`toggle-button ${isToggled ? "toggle-button-transformed" : ""}` }>
                    <img src="icons/arrow.png" alt="Double arrow for toggling a panel" width="25px"></img>
                </span>
            </div>
            <div className={`collapsible-filter-inputs ${isToggled ? "collapsed-filter-inputs" : ""}`}>
                { children }
            </div>
        </div>
    );

}