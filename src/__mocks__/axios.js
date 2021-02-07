import MockAdapter from 'axios-mock-adapter';

const axios = jest.requireActual('axios');
jest.unmock('axios');
const mockAxios = new MockAdapter(axios);

export default mockAxios;
