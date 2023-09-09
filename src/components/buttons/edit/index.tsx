import './buttonsEdit.scss'
import { IButton } from '@/src/interface/utils'

export function ButtonsEdit({children, disabled = false, name, type, value = null, onClick = null } : IButton) {
  return (
        <button 
            className="button-edit"
            disabled={disabled}
            name={name}
            type={type}
            value={value}
            onClick={onClick}>
            {children}
        </button>
    )
}