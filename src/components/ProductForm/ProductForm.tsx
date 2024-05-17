import React, { useEffect } from 'react';
import styles from './ProductForm.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import { clearProduct } from '../../redux/reducers/singleProductReducer';
import { createProduct } from '../../redux/actions/createProduct';
import { userId } from '../../utils/userId';
import { Product } from '../../interfaces/product';
import { editProduct } from '../../redux/actions/editProduct';
import ReactDOMServer from 'react-dom/server';

interface formData {
  title: string;
  description: string;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
}

const ProductForm: React.FC<{
  type: 'edit' | 'create';
}> = ({ type }): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formData>();

  const { product, singleProductLoading } = useSelector(
    (state: storeInterface) => state.product
  );

  const { loadingList } = useSelector(
    (state: storeInterface) => state.products
  );

  console.log('productState: ', product);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      const removeHTMLTags = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
      };
      const plainTextDescription = removeHTMLTags(
        product.description
      );
      setValue('title', product.title);
      setValue('description', plainTextDescription);
      setValue('grams', product.grams);
      setValue('stock', product.stock);
      setValue('price', product.price);
      setValue('comparePrice', product.comparePrice);
    }
  }, [product, type, setValue]);

  const submit = async (data: formData): Promise<void> => {
    console.log('data: ', data);

    const description = () => {
      const lineas: string[] = data.description.split('\n');
      let listaActiva: boolean = false;
      let listItems: JSX.Element[] = [];
      let elementosHTML: JSX.Element[] = [];

      lineas.forEach((linea: string, index: number) => {
        linea = linea.trim();

        if (linea.match(/^[A-Z\s]+$/) && linea.trim().length > 0) {
          const primerCaracter: string = linea
            .charAt(0)
            .toUpperCase();
          const restoPalabra: string = linea.slice(1).toLowerCase();
          elementosHTML.push(
            <h5 key={index}>{primerCaracter + restoPalabra}</h5>
          );
        } else if (linea.match(/^[A-Z].*:$/)) {
          elementosHTML.push(
            <p key={index}>
              <strong>{linea}</strong>
            </p>
          );
        } else if (linea) {
          elementosHTML.push(<p key={index}>{linea}</p>);
        } else if (!linea && index !== lineas.length - 1) {
          elementosHTML.push(<br key={index} />);
        } else if (linea.startsWith('-')) {
          if (!listaActiva) {
            listaActiva = true;
            if (listItems.length > 0) {
              elementosHTML.push(
                <ul key={`ul-${index}`}>{listItems}</ul>
              );
              listItems = [];
            }
          }
          listItems.push(
            <li key={`li-${index}`}>{linea.substring(1).trim()}</li>
          );
        } else {
          if (listaActiva) {
            listaActiva = false;
            elementosHTML.push(
              <ul key={`ul-${index}`}>{listItems}</ul>
            );
            listItems = [];
          }
        }
      });

      // Si al final hay elementos pendientes en la lista, cerrarla
      if (listaActiva && listItems.length > 0) {
        elementosHTML.push(
          <ul key={`ul-${lineas.length}`}>{listItems}</ul>
        );
      }

      // Renderizar los elementos React a una cadena de HTML
      const htmlString: string = ReactDOMServer.renderToString(
        <>{elementosHTML}</>
      );
      return htmlString;
    };

    console.log('formato de description: ', description());

    const newDescription = description();
    console.log('description: ', newDescription.replace(/\s/g, ''));
    const productData: Product = {
      title: data.title,
      description: newDescription,
      grams: data.grams,
      stock: data.stock,
      price: data.price,
      comparePrice: data.comparePrice,
    };
    type === 'create'
      ? dispatch(
          createProduct({ userId: userId.get(), data: productData })
        )
      : type === 'edit' &&
        dispatch(
          editProduct({ ...{ id: product?.id }, ...productData })
        );
  };

  return (
    <>
      {singleProductLoading ? (
        <div
          style={{ position: 'absolute', left: '50%', top: '50%' }}
          className="spinner-border text-light"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className={styles.form_container}>
          <form
            className="shadow p-3 mb-5 bg-body-tertiary rounded w-40"
            onSubmit={handleSubmit(submit)}
          >
            <h5>
              {type === 'edit'
                ? 'Editar Producto'
                : type === 'create' && 'Crear producto'}
            </h5>
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
                    message: 'Este campo es requerido',
                  },
                })}
              />
              {errors.title ? (
                <span className={styles.errors}>
                  {errors.title.message}
                </span>
              ) : (
                <br />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="floatingTextarea2">Descripcion:</label>
              <textarea
                style={{
                  height: '30vh',
                  width: '100%',
                  resize: 'none',
                }}
                id="floatingTextarea2"
                {...register('description', {
                  required: {
                    value: true,
                    message: 'Description is required',
                  },
                })}
              ></textarea>
            </div>
            {errors.description ? (
              <span className={styles.errors}>
                {errors.description.message}
              </span>
            ) : (
              <br />
            )}
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
                  pattern: {
                    value: /^\d+$/,
                    message: 'Solo numero entero',
                  },
                })}
              />
              {errors.grams ? (
                <span className={styles.errors}>
                  {errors.grams.message}
                </span>
              ) : (
                <br />
              )}
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
                    message: 'Este campo es requerido',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Solo numero entero',
                  },
                })}
              />
              {errors.stock ? (
                <span className={styles.errors}>
                  {errors.stock.message}
                </span>
              ) : (
                <br />
              )}
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
                    message: 'Este campo es requerido',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Solo numero entero',
                  },
                })}
              />
              {errors.price ? (
                <span className={styles.errors}>
                  {errors.price.message}
                </span>
              ) : (
                <br />
              )}
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
                    message: 'Este campo es requerido',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Solo numero entero',
                  },
                })}
              />
              {errors.comparePrice ? (
                <span className={styles.errors}>
                  {errors.comparePrice.message}
                </span>
              ) : (
                <br />
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loadingList}
            >
              {type === 'edit' && !loadingList
                ? 'Editar'
                : type === 'create' && !loadingList
                ? 'Crear'
                : loadingList && (
                    <div
                      style={{ width: '25px', height: '25px' }}
                      className="spinner-border text-light"
                      role="status"
                    ></div>
                  )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ProductForm;
