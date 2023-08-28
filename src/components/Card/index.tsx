import { Link } from 'react-router-dom';

import styles from './card.module.css';

export type CardProps = {
  index: number;
  img: string;
  name: string;
  id: string;
};

function Card({ index, img, name, id }: CardProps) {
  return (
    <div className={ styles.cardContainer }>
      <Link to={ `/meals/${id}` }>
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
