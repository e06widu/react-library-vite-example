import React from 'react';
import './SingtelCheckBox.css';

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
    <div className='singtel-checkbox' onClick={handleChange}>
      <img src={checked ? checkboxChecked : checkboxNotChecked} 
      alt={checked ? 'Checked' : 'Not Checked'} 
      className="singtel-checkbox-icon"/>
    </div>
  );
};

export default SingtelCheckBox;
