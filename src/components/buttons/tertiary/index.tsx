import './buttonsTertiary.scss'
import { IButton } from '@/src/interface/utils'

export function ButtonsTertiary({children, disabled = false, name, type, value = null, onClick = null } : IButton) {
  return (
        <button 
            className="button-tertiary"
            disabled={disabled}
            name={name}
            type={type}
            value={value}
            onClick={onClick}>
            {children}
        </button>
    )
}