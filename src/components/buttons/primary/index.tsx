import './buttonsPrimary.scss'
import { IButton } from '@/src/interface/utils'

export function ButtonsPrimary({children, disabled = false, name, type, value = null, onClick = null } : IButton) {
  return (
        <button 
            className="button-primary"
            disabled={disabled}
            name={name}
            type={type}
            value={value}
            onClick={onClick}>
            {children}
        </button>
    )
}