import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import styles from './ProductForm.module.css';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { storeInterface } from '../../redux/store';
import { clearProduct } from '../../redux/reducers/singleProductReducer';

interface formData {
  title: string;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
}

const ProductForm: React.FC<{
  type: 'edit' | 'create';
}> = (type): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<formData>();
  const [item1, setItem1] = useState('');
  const [listItems1, setListItems1] = useState<string[]>([]);
  const [item2, setItem2] = useState('');
  const [listItems2, setListItems2] = useState<string[]>([]);
  const [item3, setItem3] = useState('');
  const [listItems3, setListItems3] = useState<string[]>([]);

  const { product } = useSelector(
    (state: storeInterface) => state.product
  );

  console.log('productState: ', product);

  useEffect(() => {
    return () => {
      clearProduct();
    };
  });

  useEffect(() => {
    if (product) {
      const characteristicsMatch = product.description.match(
        /<strong>Características:<\/strong><\/p>(.*?)<\/ul>/s
      );
      if (characteristicsMatch) {
        const items =
          characteristicsMatch[1].match(/<li>(.*?)<\/li>/gs);
        if (items) {
          const cleanedItems = items.map((item) =>
            item.replace(/<\/?li>/g, '').trim()
          );
          setListItems1(cleanedItems);
        }
      }

      const groups = product.description.match(
        /<h5>.*?<\/h5>(<ul>.*?<\/ul>)+/gs
      );
      if (groups) {
        groups.forEach((group) => {
          const items = group.match(/<li>(.*?)<\/li>/gs);
          if (items) {
            const cleanedItems = items.map((item) =>
              item.replace(/<\/?li>/g, '').trim()
            );
            if (group.includes('Modo de Uso')) {
              setListItems2(cleanedItems);
            } else if (group.includes('Uso Específico')) {
              setListItems3(cleanedItems);
            }
          }
        });
      }
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('grams', product.grams);
      setValue('stock', product.stock);
      setValue('price', product.price);
      setValue('comparePrice', product.comparePrice);
    }
  }, [product, type, setValue]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    switch (name) {
      case 'item1':
        setItem1(value);
        break;
      case 'item2':
        setItem2(value);
        break;
      case 'item3':
        setItem3(value);
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

  const submit = async (data: formData): Promise<void> => {
    console.log('data: ', data);
    // event.preventDefault();
    const description = `${
      listItems1.length
        ? `<p><strong>Características:</strong></p>
    <ul>
    ${listItems1?.map((i) => `<li> ${i}</li>`)}
    </ul>
    <p><br></p> `
        : ''
    }
    ${
      listItems2.length
        ? `<h5>Modo de Uso</h5>
    <ul>
    ${listItems2?.map((i) => `<li> ${i}</li>`)}
    </ul>`
        : ''
    } 
    ${
      listItems3.length
        ? `<h5>Uso Específico</h5>
    <ul>
    ${listItems3?.map((i) => `<li> ${i}</li>`)}
    </ul>`
        : ''
    }`;
    console.log('description: ', description.replace(/\s/g, ''));
  };

  return (
    <div className={styles.form_container}>
      <Form onSubmit={handleSubmit(submit)}>
        <h5>Crear Producto</h5>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required',
              },
            })}
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
                className={styles.list_item}
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
                className={styles.list_item}
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
                className={styles.list_item}
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
            {...register('grams', {
              required: {
                value: true,
                message: 'Grams is required',
              },
            })}
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
            {...register('stock', {
              required: {
                value: true,
                message: 'Stock is required',
              },
            })}
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
            placeholder="0.00"
            {...register('price', {
              required: {
                value: true,
                message: 'Price is required',
              },
              pattern: {
                value: /^\d*\.?\d*$/,
                message: 'Enter a valid numerical value',
              },
            })}
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
            {...register('comparePrice', {
              required: {
                value: true,
                message: 'Compare Price is required',
              },
              pattern: {
                value: /^\d*\.?\d*$/,
                message: 'Enter a valid numerical value',
              },
            })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default ProductForm;
