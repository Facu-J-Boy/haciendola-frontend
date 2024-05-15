import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import NotFound from '../NotFound/NotFound';
import { productsList } from '../../redux/actions/productsList';
import { Product } from '../../interfaces/product';
import ProductItem from '../ProductItem.tsx/ProductItem';
import styles from './Product.module.css';
import ProductForm from '../ProductForm/ProductForm';

const Products: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { User, userLoading } = useSelector(
    (state: storeInterface) => state.user
  );

  const { products, productsLoading, loadingList } = useSelector(
    (state: storeInterface) => state.products
  );

  useEffect(() => {
    User && dispatch(productsList(User.id));
  }, [User, dispatch]);

  useEffect(() => {
    console.log('Products: ', products);
  });

  return (
    <>
      <ProductForm />
      {!User && !userLoading ? (
        <NotFound message={'401 Unauthorized'} />
      ) : !products.length && !productsLoading ? (
        <div
          style={{
            display: 'flex',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1>Empty product list</h1>
        </div>
      ) : productsLoading ? (
        <div
          style={{
            display: 'flex',
            height: '90vh',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">handle</th>
              <th scope="col">title</th>
              <th scope="col">description</th>
              <th scope="col">SKU</th>
              <th scope="col">grams</th>
              <th scope="col">stock</th>
              <th scope="col">price</th>
              <th scope="col">comparePrice</th>
              <th scope="col">barCode</th>
            </tr>
          </thead>
          <tbody>
            {loadingList && (
              <div className={styles.loading}>
                <div
                  className="spinner-grow text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {products?.map((p: Product) => (
              <ProductItem
                id={p.id}
                handle={p.handle}
                title={p.title}
                description={p.description}
                SKU={p.SKU}
                grams={p.grams}
                stock={p.stock}
                price={p.price}
                comparePrice={p.comparePrice}
                barCode={p.barCode}
              />
            ))}
          </tbody>
          {/* <ProductForm /> */}
        </table>
      )}
    </>
  );
};

export default Products;
