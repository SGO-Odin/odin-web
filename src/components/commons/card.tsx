import './card.scss'

interface ICard {
    paragraph: string
    title: string
    children: React.ReactNode
}

export default function Card({ paragraph, title, children }: ICard) {
    return (
        <div className="card">
            {children}
            <div className="content">
                <p className="card__paragraph">{paragraph}</p>
                <h3 className="card__title">{title}</h3>
            </div>
        </div>
    );
}
