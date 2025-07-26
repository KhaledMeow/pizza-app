import { useState } from 'react';
import { pizzaData } from '../data/pizzas';
import Pizza from './Pizza';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css';

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

    const handleQuantityChange = (pizzaName, quantity) => {
        setSelectedPizzas(prev => ({
            ...prev,
            [pizzaName]: { quantity: parseInt(quantity) || 0 }
        }));
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
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="10" 
                                        value={selectedPizzas[pizza.name]?.quantity || 0}
                                        onChange={(e) => handleQuantityChange(pizza.name, e.target.value)}
                                        className="quantity-slider"
                                    />
                                    <div className="quantity-display">
                                        <span>{selectedPizzas[pizza.name]?.quantity || 0} {selectedPizzas[pizza.name]?.quantity === 1 ? 'pizza' : 'pizzas'}</span>
                                        {selectedPizzas[pizza.name]?.quantity > 0 && (
                                            <span className="item-total">
                                                ${(pizza.price * (selectedPizzas[pizza.name]?.quantity || 0)).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
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