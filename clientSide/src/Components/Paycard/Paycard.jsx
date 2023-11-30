import React from 'react'
import './Paycard.css';

const paycard = () => {
  return (
    <div className="paycard">
       <div className="paycard-card">
        <div className="paycard-head">
            <img src="https://i.ibb.co/tQzgwvT/Featured-icon.png" alt="" />
            <h1>Add Credit Card Info</h1>
            <p>Enter your card details to enjoy more features.</p>
        </div>
        <div className="paycard-input">
       
       <div className="row1-input">
        <div className="col1-input">
        <label for="card-number">Name on Card</label>
        <input type="text" id="card-name" placeholder="Olivia Rhye"/>
        </div>
        <div className="col1-input col-2">
        <label for="card-number">Expiry</label>
        <input type="text" id="expiry" placeholder="06 / 2024"/>
        </div>
        </div>
       <div className="row1-input">
        <div className="col1-input cardnum-input">
        <label for="card-number">Card Number</label>
        <input type="text" id="card-number" placeholder="2354 5456 6545 6544"/>
        {/* <img className='mastercard' src="https://i.ibb.co/qNr5b4b/Payment-method-icon.png" alt="" /> */}
        </div>
        <div className="col1-input col-2">
        <label for="card-number">CVV</label>
        <input type="password" id="cvv" placeholder="123"/>
        </div>
        </div>
     
<div className="buttons">
     <button className="cancel">Cancel</button>
     <button className="save">Save</button>
     </div>

        </div>
       </div>
    </div>
  )
}

export default paycard