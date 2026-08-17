const Card = ({ Icon, title, description }) => {
  return (
    <div className="card">
      <Icon fontSize="4rem" />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Card;
