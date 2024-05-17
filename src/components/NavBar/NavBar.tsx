import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import { userId } from '../../utils/userId';
import { logOut } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { userSession } from '../../redux/actions/userSession';

const NavBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { User } = useSelector((state: storeInterface) => state.user);

  useEffect(() => {
    dispatch(userSession());
  }, [dispatch]);

  const handleLogOut = () => {
    userId.set('');
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div
            className="navbar-brand"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/');
            }}
          >
            <img
              src="https://getonbrd-prod.s3.amazonaws.com/uploads/users/logo/6137/logohaciendola200x200.jpg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Haciendola
          </div>
          {User && (
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleLogOut}
            >
              Log out
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
