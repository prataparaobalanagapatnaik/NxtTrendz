import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePaymentChange = event => {
    setPaymentMethod(event.target.value)
  }

  const handleOrderConfirm = () => {
    if (paymentMethod === 'Cash on Delivery') {
      setOrderPlaced(true)
    }
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              {/* Popup Component for Checkout */}
              <Popup
                trigger={
                  <button type="button" className="checkout-button">
                    Checkout
                  </button>
                }
                modal
              >
                {close => (
                  <div className="popup-content">
                    <h1 className="popup-heading">Select Payment Method</h1>

                    <div className="payment-methods">
                      <label>
                        <input
                          type="radio"
                          value="Net Banking"
                          onChange={handlePaymentChange}
                          disabled
                        />
                        Net Banking (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Card"
                          onChange={handlePaymentChange}
                          disabled
                        />
                        Card (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="UPI"
                          onChange={handlePaymentChange}
                          disabled
                        />
                        UPI (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Wallet"
                          onChange={handlePaymentChange}
                          disabled
                        />
                        Wallet (Disabled)
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Cash on Delivery"
                          onChange={handlePaymentChange}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="order-summary">
                      <p>Total Items: {cartList.length}</p>
                      <p>Total Cost: Rs {total}/-</p>
                    </div>

                    {/* Confirm Order Button */}
                    <button
                      type="button"
                      className="confirm-order-button"
                      onClick={handleOrderConfirm}
                      disabled={paymentMethod !== 'Cash on Delivery'}
                    >
                      Confirm Order
                    </button>

                    {orderPlaced && (
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={close}
                      className="close-popup"
                    >
                      Close
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary

