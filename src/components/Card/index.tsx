import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ContextRecipes from '../../context/ContextRecipes';
import styles from './card.module.css';

export type CardProps = {
  index: number;
  img: string;
  name: string;
  id: string;
};

function Card({ index, img, name, id }: CardProps) {
  const { pageName } = useContext(ContextRecipes);
  return (
    <div className={ styles.cardContainer }>
      <Link to={ pageName === 'Meals' ? `/meals/${id}` : `/drinks/${id}` }>
        <div data-testid={ `${index}-recipe-card` } className={ styles.card }>
          <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
          <h2
            className={ styles.cardText }
            data-testid={ `${index}-card-name` }
          >
            {name}

          </h2>
        </div>
      </Link>
    </div>
  );
}

export default Card;
