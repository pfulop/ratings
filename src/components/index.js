import React from 'react';

import Helmet from 'react-helmet';

import css from './styles.css';
import FormWrapper from './Form/FormWrapper';
import Comments from './Comments/CommentsWrapper';
import PieChart from './PieChart/PieChart';

export default () => (
  <div>
    <Helmet>
      <title>Feedback</title>
      <meta name="description" content="Feedback page" />
    </Helmet>

    <div className={css.flexContainer}>
      <div className={css.flex1}>
        <FormWrapper onSubmit={data => console.log(data)} />
      </div>
      <div className={`${css.flex1} ${css.chart}`}>
        <PieChart />
      </div>
    </div>
    <Comments />
  </div>
);
