const Card = ({ title, description, price, children }) => {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      {price ? <p className="price">{price}</p> : null}
      <p>{description || children}</p>
    </article>
  )
}

export default Card
