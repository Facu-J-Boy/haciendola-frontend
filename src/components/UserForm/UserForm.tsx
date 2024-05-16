import React, { useEffect } from 'react';
import styles from './UserForm.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeInterface } from '../../redux/store';
import { authUser } from '../../redux/actions/authUser';
import { useNavigate } from 'react-router-dom';

interface FormData {
  user: string;
  password: string;
}

const UserForm: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { User, userLoading } = useSelector(
    (state: storeInterface) => state.user
  );

  useEffect(() => {
    User && navigate('/products');
  }, [User, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { user, password } = data;
    dispatch(authUser({ user, password }));
  };

  return (
    <div className={styles.container}>
      <form
        // className="p-3 mb-5 bg-body-tertiary rounded w-40"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h5>Autenticar usuario</h5>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register('user', {
              required: {
                value: true,
                message: 'Este campo es requerido',
              }, // Si no hay nada escrito en el input de user se coloca un mensaje
              // minLength: {
              //   value: 8,
              //   message: 'Se requiere al menos 8 caracteres',
              // },
            })}
          />
          {errors.user ? (
            <span className={styles.errors}>
              {errors.user.message}
            </span>
          ) : (
            <br />
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label"
          >
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            {...register('password', {
              required: {
                value: true,
                message: 'Este campo es requerido',
              }, // Si no hay nada escrito en el input de password se coloca un mensaje
              minLength: {
                value: 8,
                message: 'Se requiere al menos 8 caracteres',
              },
            })}
          />
          {errors.password ? (
            <span className={styles.errors}>
              {errors.password.message}
            </span>
          ) : (
            <br />
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={userLoading}
        >
          {userLoading ? (
            <div
              style={{ width: '25px', height: '25px' }}
              className="spinner-border text-light"
              role="status"
            ></div>
          ) : (
            'Auth'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
