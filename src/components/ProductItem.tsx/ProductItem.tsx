import React from 'react';
import { Product } from '../../interfaces/product';
import { FiEdit, FiTrash } from 'react-icons/fi';

const ProductItem: React.FC<Product> = ({
  id,
  handle,
  title,
  description,
  SKU,
  grams,
  stock,
  price,
  comparePrice,
  barCode,
}): JSX.Element => {
  return (
    <tr>
      <td>{handle}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{SKU}</td>
      <td>{grams}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{comparePrice}</td>
      <td>{barCode}</td>
      <td>
        <button className="mx-2 border border-transparent bg-transparent">
          <FiEdit />
        </button>
        <button className="mx-2 border border-transparent bg-transparent">
          <FiTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
