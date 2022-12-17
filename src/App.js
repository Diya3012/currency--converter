import React ,{useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

import backgroundvid from './vid/video.mp4'
const BASE_URL='https://api.exchangerate.host/latest'

function App() {
  const [currencyOptions,setCurrencyOptions]=useState([])
  const [fromCurrency, setFromCurrency]=useState()
  const [toCurrency, setToCurrency]=useState()
  const [exchangeRate, setExchangeRate]=useState()
  const [amount, setAmount]=useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency]=useState(true)
  
  let toAmount, fromAmount
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount*exchangeRate
  }
  else{
    toAmount=amount
    fromAmount=amount/exchangeRate
  }

  useEffect(() =>{
    fetch(BASE_URL)
     .then(res =>res.json())
     .then (data => {
      const firstCurrency= Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
     })
   },[])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data =>setExchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency,toCurrency])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <div className='border'>
      <video autoPlay loop muted id='video'>
        <source src={backgroundvid} type='video/mp4'/>
      </video>
      <div className='frame'>
      <h1><span className="title"><i class="fa-solid fa-piggy-bank"></i>Convert</span></h1>
      <span className="text">CHOOSE NATIVE CURRENCY</span>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency} 
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <span className="text">CONVERTED VALUE</span>
      <CurrencyRow
        currencyOptions={currencyOptions} 
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
      </div>
    </div>
  );
}

export default App;
