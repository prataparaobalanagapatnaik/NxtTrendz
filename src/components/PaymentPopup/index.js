import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import './index.css'

const PaymentPopup = ({totalItems, totalPrice}) => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = e => {
    setPaymentMethod(e.target.value)
  }

  const handleOrderConfirmation = () => {
    if (paymentMethod === 'Cash on Delivery') {
      setOrderPlaced(true)
    }
  }

  return (
    <Popup
      trigger={<button className="checkout-button">Checkout</button>}
      modal
    >
      {close => (
        <div className="popup-content">
          <h3>Choose Payment Method</h3>
          <div>
            <label>
              <input
                type="radio"
                value="Net Banking"
                disabled
                onChange={handlePaymentChange}
              />
              Net Banking
            </label>
            <label>
              <input
                type="radio"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={handlePaymentChange}
              />
              Cash on Delivery
            </label>
          </div>
          <div className="summary">
            <p>Items: {totalItems}</p>
            <p>Total Price: ₹{totalPrice}</p>
          </div>
          <button
            className="confirm-button"
            onClick={handleOrderConfirmation}
            disabled={paymentMethod !== 'Cash on Delivery'}
          >
            Confirm Order
          </button>
          {orderPlaced && <p>Your order has been placed successfully!</p>}
          <button onClick={close}>Close</button>
        </div>
      )}
    </Popup>
  )
}

export default PaymentPopup
