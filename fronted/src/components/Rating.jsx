const Rating = (props) => {
  const { rating, numReviews } = props;

  const fullStars = Math.floor(rating); // Número de estrellas llenas
  const hasHalfStar = rating % 1 !== 0; // Si hay una media estrella

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          <i
            className={
              index < fullStars // Estrella llena si el índice es menor que las estrellas llenas
                ? 'fas fa-star'
                : index === fullStars && hasHalfStar // Media estrella si el índice es igual a las estrellas llenas y hay media estrella
                ? 'fas fa-star-half-alt'
                : 'far fa-star' // Estrella vacía en otros casos
            }
          />
        </span>
      ))}
      <span className="ml-2">({numReviews} reviews)</span>
    </div>
  );
};

export default Rating;
