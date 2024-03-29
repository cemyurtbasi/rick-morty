import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const filterElement = screen.getByText(/Rick/i);
  expect(filterElement).not.toBeNull();
});
