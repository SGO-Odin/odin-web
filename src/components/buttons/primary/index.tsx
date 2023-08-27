import React from 'react'
import './buttonsPrimary.scss'


export default function ButtonsPrimary({children, ...props}) {
  return (
        <button {...props} className="button-primary">
            {children}
        </button>
    )
}
