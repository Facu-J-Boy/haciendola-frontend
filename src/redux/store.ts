import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userState } from './reducers/userReducer';
import notificationReducer, {
  notificationState,
} from './reducers/notificationReducer';
import productsReducer, {
  productsState,
} from './reducers/productsReducer';

export interface storeInterface {
  user: userState;
  products: productsState;
  notification: notificationState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    notification: notificationReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
