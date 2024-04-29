interface FrontpageSectionProps<T extends {id: number}> {
    header: string,
    style: string,
    Component: React.ComponentType<T>,
    data: T[]
}

export default function FrontpageSection<T extends {id: number}>({ header, style, Component, data }: FrontpageSectionProps<T>) {

    return (
        <section className="frontpage-section">
            <h1 className="frontpage-section-header">
                { header }
            </h1>
            <div className={style}>
                { data.map(item=> (
                    <Component key={item.id} {...item}></Component>
                ))}
            </div>
        </section>
    );
}