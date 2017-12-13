import React from 'react';
import ReactStars from 'react-stars';

export default function renderInput({ input }) {
  return (
    <div>
      <ReactStars value={input.value} half={false} onChange={input.onChange} count={5} />
    </div>
  );
}
