import { MouseEventHandler } from "react";
import { ButtonsPrimary } from "../buttons/primary";
import './hero.scss'

interface IHero {
    children?: React.ReactNode
    title?: string,
    paragraph?: string,
    isButtonPrymary?: boolean
    buttonIcon?: React.ReactNode
    buttonLabel?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Hero = ({ children, title, paragraph, isButtonPrymary, buttonIcon, buttonLabel, onClick }: IHero) => {
    return (
        <header className="hero-header">
            <div className="hero-header__container">
                <div className="content">
                    {title && (<h2 className="title">{title}</h2>)}
                    {paragraph && (<p className="paragraph">{paragraph}</p>)}
                </div>
                {isButtonPrymary && (
                    <div>
                        <ButtonsPrimary onClick={onClick}>{buttonIcon}{buttonLabel}</ButtonsPrimary>
                    </div>
                )}
            </div>
            <hr className="hero-header__line" />
            {children && (
                <div className="hero-header__content">
                    {children}
                </div>
            )}
        </header>
    );
}