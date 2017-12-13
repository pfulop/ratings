import React from 'react';

export default function renderInput({
  className,
  wrapperClass,
  disabled,
  input,
  placeholder,
  errorClass,
  type,
  meta: { touched, error },
}) {
  return (
    <div className={`${wrapperClass} form-group ${touched && error && 'has-error'}`}>
      <input
        disabled={disabled}
        className={className}
        {...input}
        placeholder={placeholder}
        type={type} />{' '}
      {touched && error && <span className={`help-block error-block ${errorClass}`}>{error}</span>}
    </div>
  );
}
