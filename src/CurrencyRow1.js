import React from 'react'
import './App.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';

export default function CurrencyRow1(props) {
    const{
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    const renderTooltip = (props) => (
      
      <Tooltip id="button-tooltip" {...props} className="hover">
        
      <input classname="input" type="number" className="input" value={amount} onChange={onChangeAmount}/>
      </Tooltip>
    );
  return (
    <div className="drop">
      
      <OverlayTrigger 
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >

<select  className='curs' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
      </select>
      </OverlayTrigger>

    </div>
  )
}
