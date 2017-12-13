import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import Comment from './Comment';

export const RATINGS = gql`
  query ratings {
    ratings {
      rating
      id
      name
      email
      comment
    }
  }
`;
@graphql(RATINGS)
class CommentsWrapper extends Component {
  render() {
    console.log(this.props.data);
    if (this.props.data.loading) return <div>Loading ... </div>;
    return (
      <div>
        {this.props.data.ratings.map(comment => <Comment key={comment.id} comment={comment} />)}
      </div>
    );
  }
}

export default CommentsWrapper;
