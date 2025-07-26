import { useState } from 'react';
import { pizzaData } from '../data/pizzas';
import Pizza from './Pizza';
import { useNavigate } from 'react-router-dom';
import '../Styles/MenuPage.css';

function Header({ selectedPizzas, onCheckout, totalItems }) {
    const totalPrice = Object.entries(selectedPizzas).reduce((sum, [pizzaName, { quantity }]) => {
        const pizza = pizzaData.find(p => p.name === pizzaName);
        return sum + (pizza ? pizza.price * quantity : 0);
    }, 0);

    return (
        <header className="menu-header">
            <div className="header-content">
                <div>
                    <h1>Our Delicious Pizzas</h1>
                    <p>Handcrafted with love using the finest ingredients</p>
                </div>
                {totalItems > 0 ? (
                    <button onClick={onCheckout} className="checkout-button">
                        Pay Now (${totalPrice.toFixed(2)})
                    </button>
                ) : (
                    <button className="order-now-button">
                        Order Now
                    </button>
                )}
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer>
            <p className="footer-text">
                We're open until 22:00. Come visit us or order online!
            </p>
        </footer>
    );
}

function MenuPage() {
    const [selectedPizzas, setSelectedPizzas] = useState({});
    const navigate = useNavigate();

    const handleQuantityChange = (pizzaName, newQuantity) => {
        const quantity = Math.max(0, Math.min(10, newQuantity)); // Ensure quantity is between 0 and 10
        setSelectedPizzas(prev => ({
            ...prev,
            [pizzaName]: { quantity }
        }));
    };

    const handleIncrement = (pizzaName) => {
        const currentQuantity = selectedPizzas[pizzaName]?.quantity || 0;
        if (currentQuantity < 10) {
            handleQuantityChange(pizzaName, currentQuantity + 1);
        }
    };

    const handleDecrement = (pizzaName) => {
        const currentQuantity = selectedPizzas[pizzaName]?.quantity || 0;
        if (currentQuantity > 0) {
            handleQuantityChange(pizzaName, currentQuantity - 1);
        }
    };

    const handleCheckout = () => {
        const orderItems = Object.entries(selectedPizzas)
            .filter(([_, { quantity }]) => quantity > 0)
            .map(([pizzaName, { quantity }]) => {
                const pizza = pizzaData.find(p => p.name === pizzaName);
                return {
                    name: pizzaName,
                    quantity,
                    price: pizza.price,
                    total: pizza.price * quantity
                };
            });

        if (orderItems.length > 0) {
            navigate('/payment', { 
                state: { 
                    items: orderItems,
                    total: orderItems.reduce((sum, item) => sum + item.total, 0)
                } 
            });
        }
    };

    const totalItems = Object.values(selectedPizzas).reduce(
        (sum, { quantity }) => sum + (quantity || 0), 0
    );

    return (
        <div className="container">
            <Header 
                selectedPizzas={selectedPizzas} 
                onCheckout={handleCheckout}
                totalItems={totalItems}
            />
            
            <main>
                <div className="pizzas">
                    {pizzaData.map((pizza) => (
                        <div key={pizza.name} className="pizza-container">
                            <Pizza 
                                name={pizza.name} 
                                ingredients={pizza.ingredients} 
                                price={pizza.price} 
                                photoName={pizza.photoName} 
                                soldOut={pizza.soldOut} 
                            />
                            {!pizza.soldOut && (
                                <div className="quantity-selector">
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleDecrement(pizza.name)}
                                            className="quantity-button minus"
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <div className="quantity-display">
                                            <span className="quantity-number">
                                                {selectedPizzas[pizza.name]?.quantity || 0}
                                            </span>
                                            <span className="quantity-label">
                                                {selectedPizzas[pizza.name]?.quantity === 1 ? 'pizza' : 'pizzas'}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleIncrement(pizza.name)}
                                            className="quantity-button plus"
                                            aria-label="Increase quantity"
                                            disabled={(selectedPizzas[pizza.name]?.quantity || 0) >= 10}
                                        >
                                            +
                                        </button>
                                    </div>
                                    {selectedPizzas[pizza.name]?.quantity > 0 && (
                                        <div className="price-display">
                                            <span className="item-total">
                                                ${(pizza.price * (selectedPizzas[pizza.name]?.quantity || 0)).toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
  
export default MenuPage;