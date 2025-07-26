import React from 'react';
import { pizzaData } from './data/pizzas';
import Pizza from './components/Pizza';

function App() {
  return (
    <div className="container">
      <header className="menu-header">
        <h1>Our Delicious Pizzas</h1>
        <p>Handcrafted with love using the finest ingredients</p>
      </header>
      
      <main>
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
      </main>
      
      <footer>
        <p className="footer-text">
          We're open until 22:00. Come visit us or order online!
        </p>
      </footer>
    </div>
  );
}

export default App;
