import './buttonsSecundary.scss'
import { IButton } from '@/src/interface/utils'

export function ButtonsSecundary({children, disabled = false, name, type, value = null, onClick = null } : IButton) {
  return (
        <button 
            className="button-secundary"
            disabled={disabled}
            name={name}
            type={type}
            value={value}
            onClick={onClick}>
            {children}
        </button>
    )
}