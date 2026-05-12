import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      <div className="product-image-wrapper">
        <img
          src={
            product.image_url
              ? `http://localhost:5000${product.image_url}`
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="product-category">
          {product.category}
        </p>

        <div className="product-bottom">

          <span className="product-price">
            €{product.price}
          </span>

          <button className="add-btn">
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;