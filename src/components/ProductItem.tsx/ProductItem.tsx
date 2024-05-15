import React, { useState } from 'react';
import { Product } from '../../interfaces/product';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteProduct } from '../../redux/actions/deleteProduct';
import { Collapse, Button } from 'react-bootstrap';
import ProductForm from '../ProductForm/ProductForm';
import styles from './ProductItem.module.css';

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

  const [open, setOpen] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const descripcionSinComillas = description.replace(/^"|"$/g, '');

  const handleDelete = () => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      {showForm && (
        <>
          <div
            className={styles.form_container}
            onClick={() => setShowForm(false)}
          ></div>
          <ProductForm />
        </>
      )}
      <tr>
        <td>{handle}</td>
        <td>{title}</td>
        <td>
          <div style={{ width: '20vw' }}>
            {/* Botón para abrir/cerrar el Collapse */}
            <Button
              type="button"
              className="btn btn-dark"
              onClick={() => setOpen(!open)}
              aria-controls="descripcion-collapse"
              aria-expanded={open}
            >
              {open ? 'Hide description' : 'Show description'}
            </Button>

            {/* Collapse que contiene el HTML */}
            <Collapse in={open}>
              <div id="descripcion-collapse">
                {/* Utilizamos dangerouslySetInnerHTML con el HTML */}
                <div
                  style={{ fontSize: 'small' }}
                  dangerouslySetInnerHTML={{
                    __html: descripcionSinComillas,
                  }}
                ></div>
              </div>
            </Collapse>
          </div>
        </td>
        <td>{SKU}</td>
        <td>{grams}</td>
        <td>{stock}</td>
        <td>{price}</td>
        <td>{comparePrice}</td>
        <td>{barCode}</td>
        <td>
          <button
            className="mx-2 border border-transparent bg-transparent"
            onClick={() => setShowForm(true)}
          >
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
    </>
  );
};

export default ProductItem;
