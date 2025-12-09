import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as chatClient from '../services/chatClient';
import ChatPanel from '../components/Chatbot/ChatPanel';

test('ChatPanel sends a message and renders bot reply', async () => {
  jest.spyOn(chatClient, 'sendMessage').mockResolvedValueOnce('Hello from bot');
  render(<ChatPanel />);
  const input = screen.getByRole('textbox', { name: /chat input/i });
  fireEvent.change(input, { target: { value: 'Hi' } });
  fireEvent.submit(input.closest('form'));

  await waitFor(() => {
    expect(chatClient.sendMessage).toHaveBeenCalledWith('Hi', expect.any(Array));
  });

  // Bot reply appears
  await waitFor(() => {
    expect(screen.getByText(/hello from bot/i)).toBeInTheDocument();
  });
});
