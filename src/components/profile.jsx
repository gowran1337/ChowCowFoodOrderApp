import React from 'react';
import { useAuth } from '../context/AuthContext'; // make sure this path is correct

const Profile = ({ onCloseProfile }) => {
  const { currentUser } = useAuth();

  const grandTotal = currentUser?.orders
    ? currentUser.orders.reduce((sum, order) => sum + order.total, 0)
    : 0;
    const orderCount = currentUser?.orders ? currentUser.orders.length : 0;
  return (
    <div id="profileContainer" className='cartContainer'>
  <button className='closeBTN clickable' onClick={onCloseProfile}>X</button>
  <h2>Your Profile</h2>

  <div className="profileSummary">
    {grandTotal === 0 ? (
        <h3 className="noOrders">No orders yet.</h3>
    ) : (
        <h3 className="moneySpent">Total money spent: ${grandTotal.toFixed(2)}</h3>
    )}
    <h3>Number of orders: {orderCount}</h3>

    <div className="userInfo">
      <h3>Username: {currentUser?.username}</h3>
      <h3>Email: {currentUser?.email}</h3>
      <h3>Phone: {currentUser?.phone}</h3>
    </div>
  </div>

  <div className='orderHistory'>
    <h3  >Order History</h3>
    <p>-----------------------------------</p>
    {currentUser?.orders && currentUser.orders.length > 0 ? (
      currentUser.orders.map((order, index) => (
        <div key={index} className='orderItem'>
          <p >Order #{index + 1} - Total: ${order.total.toFixed(2)}</p>
          <p>Date: {new Date(order.date).toLocaleString()}</p>
          <ul>
            {order.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p>No orders found.</p>
    )}
  </div>
</div>

  );
};

export default Profile;