import React, { useState } from 'react';
import useSwapi from '../../../api/useSwapi';
import objectFilter from '../../../helpers/objectFilter';


export default () => {
  const [ filteredData, setFilteredData ] = useState(null);
  const data = useSwapi('/people');

  if (!data) {
    return (<div><h1>Loading...</h1></div>);
  }

  if (!filteredData) {
    setFilteredData(data);
  }

  const handleChange = event => {
      const search = event.target.value;
      const filtered = objectFilter(data, search);
      setFilteredData(filtered);
  };

  return (
    <>
      <input type="text" onChange={handleChange}></input>
      <div>{JSON.stringify(filteredData)}</div>
    </>
  );
};
