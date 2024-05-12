import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm/UserForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
