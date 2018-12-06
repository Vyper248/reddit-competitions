import React from 'react';
import Input from './Input';
import './Region.css';

const Region = ({setName, setVariations, setQty, name, variations, qty, index}) => {
    return (
        <div className="region">
            <Input onChange={setName} value={name} index={index}/>
            <Input onChange={setVariations} value={variations.join(', ')} index={index}/>
            <Input onChange={setQty} value={qty} index={index}/>
        </div>
    );
};

export default Region;