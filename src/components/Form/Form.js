import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input/Input';
import Stars from '../Input/Stars';
import css from '../styles.css';

const validate = val => {
  const err = {};
  if (!val.email) {
    err.email = 'This Field is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,1000}$/i.test(val.email)) {
    err.email = 'Wrong email format';
  }
  if (!val.name) {
    err.name = 'This Field is required';
  }

  return err;
};

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <Field name="name" placeholder="Name" component={Input} />
      <Field name="email" placeholder="Email" component={Input} />
      <Field name="rating" component={Stars} />
      <div>
        <label htmlFor="notes">Comment</label>
        <div>
          <Field id="notes" name="notes" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'feedback',
  validate,
  initialValues: { rating: 0 },
})(SimpleForm);
