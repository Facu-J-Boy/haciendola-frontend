import React from 'react';
import { Product } from '../../interfaces/product';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteProduct } from '../../redux/actions/deleteProduct';

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
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteProduct(id));
  };

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
        <button
          className="mx-2 border border-transparent bg-transparent"
          onClick={handleDelete}
        >
          <FiTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
