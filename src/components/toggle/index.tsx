import { IToggle } from '@/src/interface/utils';
import './toggle.scss'

export const Toggle = ({
    disabled,
    name,
    required,
    isActive,
    label,
    id,
    erro,
    messageErro,
    onChange,
}: IToggle) => {
    return (
        <div className="toggle">
            {erro ? (
                <span className="toggle__message">{messageErro}</span>
            ) : null}
            <label className="toggle__checkbox" htmlFor={id}>
                <input
                    type="checkbox"
                    className="toggle__checkbox__input"
                    checked={isActive}
                    id={id}
                    disabled={disabled}
                    name={name}
                    required={required}
                    onChange={onChange} />
                <div className="toggle__checkbox__button">
                </div>
            </label>
            <label className="toggle__label" htmlFor={id}>
                {label}
            </label>
        </div>
    );
}