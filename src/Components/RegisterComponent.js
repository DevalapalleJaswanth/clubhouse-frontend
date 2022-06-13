import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUp } from '../Services';
import { useNavigate } from 'react-router-dom';
import { ClubHouseContext } from '../ClubHouseContext';

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const { setUser } = useContext(ClubHouseContext);
  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{
          name: name || '',
          mail: mail || '',
          password: password || '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = '**Required';
          }
          if (!values.mail) {
            errors.mail = '**Required';
          }
          if (!values.password) {
            errors.password = '**Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          signUp(values)
            .then((result) => {
              console.log(result);
              if (result.status == 200 || result.status == 201) {
                setUser(result.data);
                navigate(`/rooms/${result.data._id}`);
              } else
                alert(
                  'entered mail may not exist or data entered is already in use'
                );
            })
            .catch((err) => console.log(err));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <table>
              <tbody>
                <tr>
                  <th>Name: </th>
                  <td>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name please"
                      style={{ height: '23px', borderRadius: '0.5rem' }}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: 'red' }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Email: </th>
                  <td>
                    <Field
                      type="mail"
                      name="mail"
                      placeholder="example@mail.com"
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
                      type="password"
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

export default RegisterComponent;
