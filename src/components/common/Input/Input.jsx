import React from 'react';
import { StyledLabel, StyledInput, StyledError } from './StyledInput';

const Input = ({
  label,
  id,
  type,
  placeholder,
  hasError,
  onSubmit,
  onChange,
  registerOptions,
}) => {
  const {
    onChange: registerOnChange,
    errors,
    ...restRegisterOptions
  } = registerOptions;

  const handleChange = (event) => {
    registerOnChange(event);
    onChange();
  };

  return (
    <>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete='off'
        onSubmit={onSubmit}
        $hasError={hasError}
        {...restRegisterOptions}
      />
      {errors[id] && <StyledError>{errors[id].message}</StyledError>}
    </>
  );
};

export default Input;