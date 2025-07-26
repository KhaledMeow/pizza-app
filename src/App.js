import React from "react";
import ReactDOM from "react-dom/client";

const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];


function App() {
    return (
        <div>
            <h1>Pizza App!</h1>
            {pizzaData.map((pizza) => (
                <Pizza key={pizza.name} name={pizza.name} ingredients={pizza.ingredients} price={pizza.price} photoName={pizza.photoName} soldOut={pizza.soldOut} />
            ))}
        </div>
    );
}
function Pizza({ name, ingredients, price, photoName, soldOut }) {
    return (
        <div>
            <img src={photoName} alt={name} />
            <h3>{name}</h3>
            <p>{ingredients}</p>
            <span>{soldOut ? "SOLD OUT" : price+'$'}</span>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export default App;
