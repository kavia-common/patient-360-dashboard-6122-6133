import { getPatients } from '../services/apiClient';

beforeEach(() => {
  // @ts-ignore
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('apiClient propagates error on non-2xx', async () => {
  // @ts-ignore
  global.fetch.mockResolvedValueOnce({
    ok: false,
    status: 500,
    headers: { get: () => 'application/json' },
    json: async () => ({ message: 'Server error' }),
    text: async () => 'Server error',
  });
  await expect(getPatients()).rejects.toThrow(/Request failed/i);
});
