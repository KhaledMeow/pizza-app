import React, { useState } from 'react';
import '../Styles/Payment.css';

function Payment() {
    const [selectedPayment, setSelectedPayment] = useState('creditCard');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission based on selected method
        console.log('Processing payment with:', selectedPayment);
        if (selectedPayment === 'creditCard') {
            console.log('Card details:', cardDetails);
        }
    };

    return (
        <div className="payment">
            <h2>Select Payment Method</h2>
            
            <div className="payment-methods">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        checked={selectedPayment === 'creditCard'}
                        onChange={() => setSelectedPayment('creditCard')}
                    />
                    Credit/Debit Card
                </label>
                
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={selectedPayment === 'paypal'}
                        onChange={() => setSelectedPayment('paypal')}
                    />
                    PayPal
                </label>
                
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={selectedPayment === 'bankTransfer'}
                        onChange={() => setSelectedPayment('bankTransfer')}
                    />
                    Bank Transfer
                </label>
            </div>

            <form onSubmit={handleSubmit}>
                {selectedPayment === 'creditCard' && (
                    <div className="credit-card-form">
                        <div>
                            <label>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div>
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={cardDetails.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div>
                            <label>CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                            />
                        </div>
                        <div>
                            <label>Name on Card</label>
                            <input
                                type="text"
                                name="nameOnCard"
                                value={cardDetails.nameOnCard}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                )}

                {selectedPayment === 'paypal' && (
                    <div className="paypal-method">
                        <p>You will be redirected to PayPal to complete your payment.</p>
                        <button type="button">Pay with PayPal</button>
                    </div>
                )}

                {selectedPayment === 'bankTransfer' && (
                    <div className="bank-transfer-method">
                        <p>Please transfer the amount to the following bank account:</p>
                        <p>Bank Name: Example Bank</p>
                        <p>Account Name: Pizza Shop</p>
                        <p>Account Number: 1234 5678 9012 3456</p>
                        <p>Sort Code: 12-34-56</p>
                        <p>Please use your order ID as the payment reference.</p>
                    </div>
                )}

                <button type="submit">
                    {selectedPayment === 'creditCard' ? 'Pay Now' : 'Continue'}
                </button>
            </form>
        </div>
    );
}

export default Payment;
