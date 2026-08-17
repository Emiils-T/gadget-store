const Card = ({ Icon, title, description }) => {
  return (
    <div className="card">
      <Icon fontSize="large" />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Card;
