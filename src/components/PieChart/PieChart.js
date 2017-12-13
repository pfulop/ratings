import React, { Component } from 'react';

import Pie from 'react-minimal-pie-chart';

import { gql, graphql } from 'react-apollo';

import randomColor from 'randomcolor';

export const STATS = gql`
  query stats {
    stats {
      one
      two
      three
      four
      five
      zero
    }
  }
`;
@graphql(STATS)
class PieChart extends Component {
  render() {
    if (this.props.data.loading) return <div>Loading</div>;
    const data = Object.keys(this.props.data.stats)
      .filter(key => this.props.data.stats[key] > 0)
      .map(key => ({
        value: Number(this.props.data.stats[key]),
        key,
        color: randomColor(),
      }));

    return <Pie data={data} />;
  }
}

export default PieChart;
