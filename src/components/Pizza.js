import React from 'react';

function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <div className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? 'SOLD OUT' : `$${price}`}</span>
      </div>
    </div>
  );
}

export default Pizza;
