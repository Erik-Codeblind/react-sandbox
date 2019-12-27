import React from 'react';
import { Router } from '@reach/router';
import ObjectFilter from '../components/demos/ObjectFilter/ObjectFilter';
import { homeURL } from './urls';

export default () => (
  <Router>
    <ObjectFilter path={homeURL} />
  </Router>
);
