import { render, fireEvent } from '@testing-library/react';
import SingtelRadioButton from '../lib/SingtelRadioButton';
import '@testing-library/jest-dom/extend-expect';



describe('SingtelRadioButton', () => {
    it('renders unchecked radio button by default', () => {
      const { container } = render(<SingtelRadioButton checked={false} onChange={() => {console.log('changed')}} />);
      const radioButton = container.querySelector('.singtel-radio-button');
      const radioIcon = container.querySelector('.singtel-radio-icon');
      
      expect(radioButton).toBeInTheDocument();
      expect(radioIcon).toBeInTheDocument();
    //   expect(radioIcon?.getAttribute('src')).toBe('../assets/radioNotChecked.svg');
      expect(radioIcon?.getAttribute('alt')).toBe('Not Checked');
    });
  
    it('renders checked radio button when checked prop is true', () => {
      const { container } = render(<SingtelRadioButton checked={true} onChange={() => {console.log('changed')}} />);
      const radioButton = container.querySelector('.singtel-radio-button');
      const radioIcon = container.querySelector('.singtel-radio-icon');
  
      expect(radioButton).toBeInTheDocument();
      expect(radioIcon).toBeInTheDocument();
    //   expect(radioIcon?.getAttribute('src')).toBe('../assets/radioChecked.svg');
      expect(radioIcon?.getAttribute('alt')).toBe('Checked');
    });
  
    it('calls onChange handler when radio button is clicked', () => {
      const handleChange = jest.fn();
      const { container } = render(<SingtelRadioButton checked={false} onChange={handleChange} />);
      const radioButton = container.querySelector('.singtel-radio-button');
  
      expect(handleChange).not.toHaveBeenCalled();
  
      fireEvent.click(radioButton!);
  
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });