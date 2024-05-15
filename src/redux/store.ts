import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userState } from './reducers/userReducer';
import notificationReducer, {
  notificationState,
} from './reducers/notificationReducer';
import productsReducer, {
  productsState,
} from './reducers/productsReducer';
import singleProductReducer, {
  singleProductState,
} from './reducers/singleProductReducer';

export interface storeInterface {
  user: userState;
  product: singleProductState;
  products: productsState;
  notification: notificationState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    product: singleProductReducer,
    products: productsReducer,
    notification: notificationReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
