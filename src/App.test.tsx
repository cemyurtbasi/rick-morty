import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CharacterList', () => {
  render(<App />);
  const linkElement = screen.getByText(/CharacterList/i);
  expect(linkElement).not.toBeNull();
});
