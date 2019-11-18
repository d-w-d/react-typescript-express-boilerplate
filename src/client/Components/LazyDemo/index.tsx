import React from 'react';

export const LazyDemo = () => (
  <div>
    <h1>This Component Is Lazily Loaded!</h1>
  </div>
);

// Lazy-loaded components require default export
export default LazyDemo;
