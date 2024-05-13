import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userState } from './reducers/userReducer';
import notificationReducer, {
  notificationState,
} from './reducers/notificationReducer';

export interface storeInterface {
  notification: notificationState;
  user: userState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
