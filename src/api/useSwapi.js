import useApi from './useApi';

export default (path = '') => {
  const url = `https://swapi.co/api${path}`;
  return useApi(url);
}
