import React from 'react'
import './buttonsPrimary.scss'

interface IButtonPrimary {
    children: React.ReactNode
}

export default function ButtonsPrimary({children} : IButtonPrimary) {
  return (
        <button className="button-primary">
            {children}
        </button>
    )
}
