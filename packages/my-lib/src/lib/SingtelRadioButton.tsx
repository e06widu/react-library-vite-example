import React from 'react';
import './SingtelRadioButton.css';

import radioNotChecked from '../assets/radioNotChecked.svg';
import radioChecked from '../assets/radioChecked.svg';

interface SingtelRadioButtonProps {
  checked: boolean;
  onChange: () => void;
}

const SingtelRadioButton: React.FC<SingtelRadioButtonProps> = ({ checked, onChange }) => {
  return (
    <div className="singtel-radio-button" onClick={onChange}>
      <img
        src={checked ? radioChecked : radioNotChecked}
        alt={checked ? 'Checked' : 'Not Checked'}
        className="singtel-radio-icon"
      />
    </div>
  );
};

export default SingtelRadioButton;