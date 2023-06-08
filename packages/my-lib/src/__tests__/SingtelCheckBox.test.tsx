import { render, fireEvent } from '@testing-library/react';
import SingtelCheckBox from '../lib/SingtelCheckBox';
import '@testing-library/jest-dom/extend-expect';

describe('SingtelCheckBox', () => {
  it('renders unchecked checkbox by default', () => {
    const { container } = render(<SingtelCheckBox checked={false} onChange={() => {
        console.log('changed')
    }} />);
    const checkbox = container.querySelector('.singtel-checkbox');
    const checkboxIcon = container.querySelector('.singtel-checkbox-icon');

    expect(checkbox).toBeInTheDocument();
    expect(checkboxIcon).toBeInTheDocument();
    // expect(checkboxIcon?.getAttribute('src')).toBe('/src/assets/checkboxNotChecked.svg');
    expect(checkboxIcon?.getAttribute('alt')).toBe('Not Checked');
  });

  it('renders checked checkbox when checked prop is true', () => {
    const { container } = render(<SingtelCheckBox checked={true} onChange={() => {
        console.log('changed')
    }} />);
    const checkbox = container.querySelector('.singtel-checkbox');
    const checkboxIcon = container.querySelector('.singtel-checkbox-icon');

    expect(checkbox).toBeInTheDocument();
    expect(checkboxIcon).toBeInTheDocument();
    // console.log(checkboxIcon)
    // expect(checkboxIcon?.getAttribute('src')).toBe('/src/assets/checkboxChecked.svg');
    expect(checkboxIcon?.getAttribute('alt')).toBe('Checked');
  });

  it('calls onChange handler when checkbox is clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(<SingtelCheckBox checked={false} onChange={handleChange} />);
    const checkbox = container.querySelector('.singtel-checkbox');

    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.click(checkbox!);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });
});
