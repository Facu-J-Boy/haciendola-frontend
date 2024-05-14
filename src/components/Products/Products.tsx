import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import NotFound from '../NotFound/NotFound';
import { productsList } from '../../redux/actions/productsList';
import { Product } from '../../interfaces/product';
import ProductItem from '../ProductItem.tsx/ProductItem';

const Products: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const { User } = useSelector((state: storeInterface) => state.user);

  const { products } = useSelector(
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
      {!User ? (
        <NotFound message={'401 Unauthorized'} />
      ) : !products.length ? (
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
            {/* <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Products;
