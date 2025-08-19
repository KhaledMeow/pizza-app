import React, { useState } from 'react';

function Pizza({ name, description, ingredients, price, photoName, soldOut, cookingTime, calories }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`pizza ${soldOut ? 'sold-out' : ''}`}>
      <img src={photoName} alt={name} />
      <div className="pizza-info">
        <h3>{name}</h3>
        <p className="pizza-description">{description}</p>
        
        <div className="pizza-meta">
          <span>⏱️ {cookingTime}</span>
          <span>🔥 {calories}</span>
        </div>
        
        <button 
          className="ingredients-toggle"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Ingredients'}
        </button>
        
        {showDetails && (
          <div className="ingredients-details">
            <h4>Ingredients:</h4>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li 
                  key={index}
                  className={ingredient.isAllergen ? 'allergen' : ''}
                >
                  {ingredient.name}
                  {ingredient.isAllergen && <span className="allergen-badge">Allergen</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="pizza-footer">
          <span className={`price ${soldOut ? 'sold-out-text' : ''}`}>
            {soldOut ? 'UNAVAILABLE - CHECK BACK SOON' : `$${price}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Pizza;
