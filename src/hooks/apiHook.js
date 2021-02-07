import { useReducer, useCallback } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
  loading: false,
  error: null,
  data: null,
  identifier: '',
};

const apiReducer = (currentState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...currentState,
        loading: false,
        data: action.data,
      };
    case 'ERROR':
      return {
        ...currentState,
        loading: false,
        error: action.error,
      };
    case 'CLEAR':
      return INITIAL_STATE;
    default:
      throw new Error('Should not be reached!');
  }
};

const useApi = () => {
  const [requestState, dispatchRequest] = useReducer(apiReducer, INITIAL_STATE);

  const clear = useCallback(() => {
    dispatchRequest({ type: 'CLEAR' });
  }, []);

  const sendRequest = useCallback(async (url, method, params, identifier) => {
    dispatchRequest({ type: 'SEND', identifier });

    try {
      const response = await axios({
        method,
        url,
        params,
      });

      dispatchRequest({ type: 'RESPONSE', data: response.data });
    } catch (error) {
      console.error(error);
      dispatchRequest({ type: 'ERROR', error });
    }
  }, []);

  return {
    loading: requestState.loading,
    error: requestState.error,
    data: requestState.data,
    apiIdentifier: requestState.identifier,
    sendRequest,
    clear,
  };
};

export default useApi;
