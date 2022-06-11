import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signIn } from '../Services';
import { useNavigate } from 'react-router-dom';
import { ClubHouseContext } from '../ClubHouseContext';

const LoginComponent = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(ClubHouseContext);
  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={{
          mail: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.mail) {
            errors.mail = '**Required';
          }
          if (!values.password) {
            errors.password = '**Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          signIn(values)
            .then((result) => {
              if (result.status == 200) {
                setUser(result.data);
                navigate(`/rooms/${result.data._id}`);
              } else alert('Please enter correct username or password');
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <table>
              <tbody>
                <tr>
                  <th>Email: </th>
                  <td>
                    <Field
                      type="mail"
                      name="mail"
                      style={{ height: '23px', borderRadius: '0.5rem' }}
                    />
                    <ErrorMessage
                      name="mail"
                      component="div"
                      style={{ color: 'red' }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Password: </th>
                  <td>
                    <Field
                      type="text"
                      name="password"
                      style={{ height: '23px', borderRadius: '0.5rem' }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={{ color: 'red' }}
                    />
                  </td>
                </tr>

                <tr>
                  <th>
                    <button type="submit">Submit</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginComponent;
