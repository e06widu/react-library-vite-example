import React, { useState } from 'react';
import checkboxNotChecked from '../assets/checkboxNotChecked.svg';
import checkboxChecked from '../assets/checkboxChecked.svg';

interface SingtelCheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SingtelCheckBox: React.FC<SingtelCheckBoxProps> = ({ checked, onChange }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div onClick={handleChange}>
      {checked ? (
        <img src={checkboxChecked} alt="Checked" />
      ) : (
        <img src={checkboxNotChecked} alt="Not Checked" />
      )}
    </div>
  );
};

export default SingtelCheckBox;
