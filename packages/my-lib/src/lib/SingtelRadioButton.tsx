import React from 'react';

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
        alt="Radio Icon"
        className="singtel-radio-icon"
      />
    </div>
  );
};

export default SingtelRadioButton;