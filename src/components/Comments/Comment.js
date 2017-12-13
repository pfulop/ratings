import React from 'react';
import css from '../styles.css';

export default ({ comment: { name, email, comment, rating, id } }) => (
  <div className={css.comment}>
    <div>
      Name (email): {name} ({email})
    </div>
    Comment: {comment} <div>rating: {rating}</div>
  </div>
);
