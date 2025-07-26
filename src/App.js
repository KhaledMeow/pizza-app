import React from 'react';
import { pizzaData } from './data/pizzas';
import Pizza from './components/Pizza';

function App() {
  return (
    <div className="menu">
      <h1>Our Menu</h1>
      <div className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza 
            key={pizza.name} 
            name={pizza.name} 
            ingredients={pizza.ingredients} 
            price={pizza.price} 
            photoName={pizza.photoName} 
            soldOut={pizza.soldOut} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
