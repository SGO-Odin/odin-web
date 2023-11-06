import './select.scss';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import React, { useState } from 'react';
import { ISelect } from '@/src/interface/utils';

export function Select({ item, setItem, options, label, messageErro, placeholder }: ISelect) {

  const [open, setOpen] = useState(false);
  const nameOrder = item && options.find(option => option._id === item)?.name;

  return (
    <div className="selects">
      <label className="selects__label" onClick={() => setOpen(!open)}>
        {label}
      </label>
      <button
        type='button'
        className={'btn-select'}
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)} >
        <span className={`btn-select__text${item !== null ? '--active' : ''}`}>
          {nameOrder || placeholder || 'Selecione uma opção:'}
          {open ?
            <MdKeyboardArrowUp
              size={24}
              color="#101010"
            />
            :
            <MdKeyboardArrowDown
              size={24}
              color="#101010"
            />}
        </span>
        <div className={`btn-select__options${open ? '--active' : ''}`}>
          {!!options && options.map(option => (
            <div
              className={'btn-select__options__option'}
              key={option._id}
              onClick={() => setItem(option._id)}>
              {option.name}
            </div>
          ))}
        </div>
      </button>
      {messageErro ? (
        <span className="selects__message">{messageErro}</span>
      ) : null}
    </div>
  );
}