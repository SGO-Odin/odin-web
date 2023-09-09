import './buttonsDelete.scss'
import { IButton } from '@/src/interface/utils'

export function ButtonsDelete({children, disabled = false, name, type, value = null, onClick = null } : IButton) {
  return (
        <button 
            className="button-delete"
            disabled={disabled}
            name={name}
            type={type}
            value={value}
            onClick={onClick}>
            {children}
        </button>
    )
}