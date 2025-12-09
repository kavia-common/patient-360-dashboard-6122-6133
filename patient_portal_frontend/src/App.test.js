import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and chatbot panel', () => {
  render(<App />);
  // Header actions
  expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  // Chatbot input
  expect(screen.getByRole('textbox', { name: /chat input/i })).toBeInTheDocument();
});
