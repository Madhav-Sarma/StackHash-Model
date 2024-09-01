import React, { useState } from 'react';
import './PaymentPage.css'; // Ensure to rename and link the CSS file accordingly

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('Net Banking');
    const [transactionId, setTransactionId] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const fakeTransactionId = `TXN${Math.floor(Math.random() * 10000000000)}`;
        setTransactionId(fakeTransactionId);
        setPaymentSuccess(true);
    };

    return (
        <div className="payment-container">
            {!paymentSuccess ? (
                <form onSubmit={handlePaymentSubmit} className="payment-form">
                    <h2>Payment Details</h2>
                    
                    {/* Payment Method Selection */}
                    <div className="payment-methods">
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="UPI"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                checked={paymentMethod === 'UPI'}
                            />
                            UPI
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="Credit Card"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                checked={paymentMethod === 'Credit Card'}
                            />
                            Credit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="Debit Card"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                checked={paymentMethod === 'Debit Card'}
                            />
                            Debit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment-method"
                                value="Net Banking"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                checked={paymentMethod === 'Net Banking'}
                            />
                            Net Banking
                        </label>
                    </div>

                    {/* Payment Details */}
                    <div className="payment-details">
                        {paymentMethod === 'UPI' && (
                            <div>
                                <label>UPI ID</label>
                                <input type="text" placeholder="Enter UPI ID" required />
                            </div>
                        )}
                        {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
                            <div>
                                <label>Card Number</label>
                                <input type="text" placeholder="Enter card number" required />
                                <label>Expiry Date</label>
                                <input type="text" placeholder="MM/YY" required />
                                <label>CVV</label>
                                <input type="text" placeholder="CVV" required />
                            </div>
                        )}
                        {paymentMethod === 'Net Banking' && (
                            <div>
                                <label>Bank</label>
                                <select required>
                                    <option>AXIS Bank</option>
                                    <option>HDFC Bank</option>
                                    <option>ICICI Bank</option>
                                    <option>Kotak Mahindra Bank</option>
                                    <option>State Bank of India</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="place-order-btn">Place Order</button>
                </form>
            ) : (
                <div className="success-section">
                    <h2>Payment Successful!</h2>
                    <p>Transaction ID: <strong>{transactionId}</strong></p>
                    <p>Payment Method: <strong>{paymentMethod}</strong></p>
                </div>
            )}
        </div>
    );
};

export default Payment;
