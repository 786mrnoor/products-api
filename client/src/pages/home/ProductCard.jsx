import { memo } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onDelete }) {
  return (
    <li className={product.featured ? "featured" : ""}>
      <p>
        {product.name}
        <strong>{product.price}</strong>
      </p>
      <p>
        {product.company} {!!product.rating && `| Rating: ${product.rating}`}
        <Link className="edit-button" to={`/edit-product/${product._id}`}>
          Edit
        </Link>
        <button onClick={() => onDelete(product._id)}>Delete</button>
      </p>
    </li>
  );
}

export default memo(ProductCard);
