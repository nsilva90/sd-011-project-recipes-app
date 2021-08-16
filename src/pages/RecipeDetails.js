import React from 'react';
import '../components/css/RecipeDetails.css';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails(props) {
  const { location: { state: { foodInfo } } } = props;
  console.log(foodInfo);
  const entries = Object.entries(foodInfo);
  console.log(entries);
  return (
    <div className="supply-card">
      <img
        data-testid="recipe-photo"
        src={ foodInfo.strMealThumb }
        alt={ foodInfo.strMeal }
      />
      <h1 data-testid="recipe-title">{ foodInfo.strMeal}</h1>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      </button>
      <p>{foodInfo.strCategory}</p>
      <ul>
        { entries.filter((entry) => {
          console.log('iniciou');
          let count = 1;
          if (entry[0] === `strIngredient${count}`) {
            count += 1;
          }
          return entry[0] === `strIngredient${count}`;
        })}
      </ul>
    </div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      foodInfo: PropTypes.arrayOf(PropTypes.array).isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
