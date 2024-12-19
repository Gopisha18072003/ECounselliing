import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CheckboxInput = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          color="primary"
          required
           // Custom style
        />
      }
      label={label}
      style={{ fontSize: '0.5rem' }}
    />
  );
};

export default CheckboxInput;
