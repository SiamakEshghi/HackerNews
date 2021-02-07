import {
  screen,
  fireEvent,
  cleanup,
  waitFor,
  render,
  act,
} from '@testing-library/react';
import mockAxios from 'axios';

import { fakeResult } from '../../testUtils/generators';
import News from './News';
import { API_URL } from './News';

const setup = () => {
  return render(<News />);
};

describe('News Events', () => {
  let searchInput;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    jest.useRealTimers();
  });

  it('Search works with change query', async () => {
    const { getByPlaceholderText, getAllByText, getByTestId } = setup();

    mockAxios.onGet(API_URL).reply(200, fakeResult);

    const searchInput = getByPlaceholderText(/Search for the news/i);
    expect(searchInput).toBeDefined();

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'testQuery' } });
      jest.runAllTimers();
    });

    expect(searchInput.value).toBe('testQuery');
    expect(getByTestId('spinner')).toBeInTheDocument();

    const hitCards = await waitFor(() => getAllByText(/title+/i));
    expect(hitCards.length).toEqual(3);
  });

  it('Show error modal', async () => {
    const { getByPlaceholderText, getByText } = setup();

    mockAxios.onGet(API_URL).reply(404, {});

    const searchInput = getByPlaceholderText(/Search for the news/i);

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'testQuery' } });
      jest.runAllTimers();
    });

    const errorEl = await waitFor(() =>
      getByText('Something went wrong in first attempt!')
    );
    expect(errorEl).toBeDefined();
  });
});
