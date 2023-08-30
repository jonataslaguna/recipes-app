import Flicking from '@egjs/react-flicking';
import { RecommendationsType } from './types';
import '@egjs/react-flicking/dist/flicking.css';

type Props = {
  recommendations: RecommendationsType[];
  type: string;
};

function Recommendations({ recommendations, type }: Props) {
  return (
    <div
      data-testid="recomendations"
    >
      <Flicking
        align="prev"
        horizontal
        bound
        panelsPerView={ 2 }
        moveType={ ['strict', { count: 2 }] }
        preventClickOnDrag
      >
        {
        recommendations && recommendations.map((recommendation, index) => {
          const maxIndex = 6;
          if (index >= maxIndex) return null;
          return (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
              style={ {
                width: '163.2px',
                marginRight: '10px',
                border: '#B1B1B1 0.52px solid',
                borderRadius: '5px',
                textAlign: 'center',
              } }
            >
              <img
                src={ type === 'Meal'
                  ? recommendation.strDrinkThumb
                  : recommendation.strMealThumb }
                alt={ type === 'Meal'
                  ? recommendation.strMeal
                  : recommendation.strDrink }
                style={ {
                  width: '100%',
                  borderRadius: '5px 5px 0 0',
                  objectFit: 'cover',
                } }
              />
              <p
                style={ {
                  fontFamily: 'Epilogue',
                  fontWeight: '400',
                  fontSize: '12px',
                  textAlign: 'left',
                  margin: '8px 20px',
                } }
                data-testid={ `${index}-recommendation-title` }
              >
                { type === 'Meal'
                  ? recommendation.strDrink
                  : recommendation.strMeal }
              </p>
            </div>
          );
        })
      }
      </Flicking>
    </div>
  );
}

export default Recommendations;
