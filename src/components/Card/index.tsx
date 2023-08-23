export type CardProps = {
  index: number;
  img: string;
  name: string;
};

function Card({ index, img, name }: CardProps) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
    </div>
  );
}

export default Card;
