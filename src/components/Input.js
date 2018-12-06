import React from 'react';
import './Input.css';

const Input = ({onChange, value, index, placeholder}) => {
    return (
        <div>
            <input className="input roundedBorder" type="text" onChange={onChange} value={value} index={index} placeholder={placeholder}/>
        </div>
    );
}

export default Input;