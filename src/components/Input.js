import React from 'react';
import './Input.css';

const Input = ({onChange, value, index}) => {
    return (
        <div>
            <input className="input roundedBorder" type="text" onChange={onChange} value={value} index={index}/>
        </div>
    );
}

export default Input;