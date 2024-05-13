import React from 'react';
import { useSelector } from 'react-redux';
import { storeInterface } from '../../redux/store';
import NotFound from '../NotFound/NotFound';

const Products: React.FC = (): JSX.Element => {
  const { User } = useSelector((state: storeInterface) => state.user);
  return (
    <>
      {!User ? (
        <NotFound message={'401 Unauthorized'} />
      ) : (
        <div>Products</div>
      )}
    </>
  );
};

export default Products;
