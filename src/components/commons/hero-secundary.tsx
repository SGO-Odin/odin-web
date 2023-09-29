import './hero-secundary.scss'

interface IHero {
    title: string
}

export const HeroSecundary = ({ title }: IHero) => {
    return (
        <header className="hero-secundary">
            <h2 className="hero-secundary__title">
                {title}
            </h2>
            <hr className="hero-secundary__line" />
        </header>
    );
}