import { useEffect, useState } from 'react';

export default (url) => {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (e) {
        throw new Error(e);
      }
    };
    getData();
  }, [url]);

  if (data) {
    return data;
  }
};
