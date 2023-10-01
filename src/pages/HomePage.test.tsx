import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders CharacterList', () => {
  render(<HomePage />);
  const filterElement = screen.getByText(/Rick/i);
  expect(filterElement).not.toBeNull();
});
