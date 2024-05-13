import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm/UserForm';
import Notification from './components/Notification/Notification';
import { useSelector } from 'react-redux';
import { storeInterface } from './redux/store';
import Products from './components/Products/Products';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';

function App() {
  const { message } = useSelector(
    (state: storeInterface) => state.notification
  );
  return (
    <Router>
      <NavBar />
      {message && <Notification message={message} />}
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="*"
          element={<NotFound message={'404 Not found'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
