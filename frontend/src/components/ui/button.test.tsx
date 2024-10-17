// File: Project/frontend/src/components/ui/button.test.tsx

import { render, fireEvent } from 'vitest';
import Button from '../button';

test('Button renders correctly', () => {
  const { getByText } = render(<Button label="Click me" />);
  const button = getByText('Click me');
  expect(button).toBeInTheDocument();
});

test('Button onClick event works', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button label="Click me" onClick={handleClick} />);
  const button = getByText('Click me');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
