import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import styles from './ProductForm.module.css';

const ProductForm: React.FC = (): JSX.Element => {
  const [title, setTitle] = useState('');
  const [grams, setGrams] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [item1, setItem1] = useState('');
  const [listItems1, setListItems1] = useState<string[]>([]);
  const [item2, setItem2] = useState('');
  const [listItems2, setListItems2] = useState<string[]>([]);
  const [item3, setItem3] = useState('');
  const [listItems3, setListItems3] = useState<string[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'item1':
        setItem1(value);
        break;
      case 'item2':
        setItem2(value);
        break;
      case 'item3':
        setItem3(value);
        break;
      case 'grams':
        setGrams(value);
        break;
      case 'stock':
        setStock(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'comparePrice':
        setComparePrice(value);
        break;
      default:
        break;
    }
  };

  const handleItemSubmit = (item: 1 | 2 | 3) => {
    if (item === 1) {
      if (item1.trim() !== '') {
        setListItems1([...listItems1, item1]);
        setItem1('');
      }
    }
    if (item === 2) {
      if (item2.trim() !== '') {
        setListItems2([...listItems2, item2]);
        setItem2('');
      }
    }
    if (item === 3) {
      if (item3.trim() !== '') {
        setListItems3([...listItems3, item3]);
        setItem3('');
      }
    }
  };

  const handleDeleteItem = (index: number, item: 1 | 2 | 3) => {
    if (item === 1) {
      const updatedList1 = listItems1.filter((_, i) => i !== index);
      setListItems1(updatedList1);
    }
    if (item === 2) {
      const updatedList2 = listItems2.filter((_, i) => i !== index);
      setListItems2(updatedList2);
    }
    if (item === 3) {
      const updatedList3 = listItems3.filter((_, i) => i !== index);
      setListItems3(updatedList3);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit ejecutado');
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.form_container}>
        <Form onSubmit={handleSubmit}>
          <h5>Crear Producto</h5>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div>
            <h5>Caracteristicas:</h5>
            <Form.Group controlId="formItem">
              <Form.Label>Nuevo item:</Form.Label>
              <Form.Control
                type="text"
                name="item1"
                value={item1}
                onChange={handleChange}
                placeholder="Ingrese un nuevo ítem"
              />
            </Form.Group>
            <Button
              variant="dark"
              onClick={() => {
                handleItemSubmit(1);
              }}
            >
              Agregar
            </Button>
            <ListGroup>
              {listItems1.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  style={{
                    display: 'inline',
                    overflowWrap: 'break-word',
                    width: '50vw',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>{item}</p>
                  <Button
                    variant="dark"
                    onClick={() => handleDeleteItem(index, 1)}
                  >
                    X
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div>
            <h5>Modo de Uso:</h5>
            <Form.Group controlId="formItem">
              <Form.Label>Nuevo item:</Form.Label>
              <Form.Control
                type="text"
                name="item2"
                value={item2}
                onChange={handleChange}
                placeholder="Ingrese un nuevo ítem"
              />
            </Form.Group>
            <Button
              variant="dark"
              onClick={() => {
                handleItemSubmit(2);
              }}
            >
              Agregar
            </Button>
            <ListGroup>
              {listItems2.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  style={{
                    display: 'inline',
                    overflowWrap: 'break-word',
                    width: '50vw',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>{item}</p>
                  <Button
                    variant="dark"
                    onClick={() => handleDeleteItem(index, 2)}
                  >
                    X
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div>
            <h5>Uso Específico:</h5>
            <Form.Group controlId="formItem">
              <Form.Label>Nuevo item:</Form.Label>
              <Form.Control
                type="text"
                name="item3"
                value={item3}
                onChange={handleChange}
                placeholder="Ingrese un nuevo ítem"
              />
            </Form.Group>
            <Button
              variant="dark"
              onClick={() => {
                handleItemSubmit(3);
              }}
            >
              Agregar
            </Button>
            <ListGroup>
              {listItems3.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  style={{
                    display: 'inline',
                    overflowWrap: 'break-word',
                    width: '50vw',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>{item}</p>
                  <Button
                    variant="dark"
                    onClick={() => handleDeleteItem(index, 3)}
                  >
                    X
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="mb-3">
            <label htmlFor="grams" className="form-label">
              Grams
            </label>
            <input
              type="text"
              className="form-control"
              id="grams"
              name="grams"
              value={grams}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="stock" className="form-label">
              Stock
            </label>
            <input
              type="text"
              className="form-control"
              id="stock"
              name="stock"
              value={stock}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comparePrice" className="form-label">
              Compare price
            </label>
            <input
              type="text"
              className="form-control"
              id="comparePrice"
              name="comparePrice"
              value={comparePrice}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
