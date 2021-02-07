import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Head', () => {
  render(<App />);
  const head = screen.getByText(/Hacker News/i);
  expect(head).toBeInTheDocument();
});
