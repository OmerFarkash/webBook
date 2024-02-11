import { render, fireEvent } from '@testing-library/react';
import RegInput from   '../Components/RegIn/RegInput';

test('renders RegInput and checks onChange', () => {
  const onChange = jest.fn();
  const { getByRole } = render(<RegInput onChange={onChange} />);
  const input = getByRole('textbox');

  // Check initial render
  expect(input).toBeInTheDocument();

  // Simulate input change
  fireEvent.change(input, { target: { value: 'test' } });

  // Check if onChange has been called
  expect(onChange).toHaveBeenCalled();
});
