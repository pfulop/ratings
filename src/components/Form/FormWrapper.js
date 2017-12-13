import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import uniqueString from 'unique-string';
import { gql, graphql } from 'react-apollo';
import Form from './Form';
import { RATINGS } from '../Comments/CommentsWrapper';
import { STATS } from '../PieChart/PieChart';

const ADD_RATING = gql`
  mutation addRating($name: String!, $email: String!, $rating: Int!, $comment: String) {
    addRating(name: $name, email: $email, rating: $rating, comment: $comment) {
      id
      name
      email
      rating
      comment
    }
  }
`;

@graphql(ADD_RATING)
class FormWrapper extends Component {
  render() {
    return (
      <Form
        onSubmit={data => {
          this.props
            .mutate({
              variables: data,
              update: (store, { data: rating }) => {
                const ratings = store.readQuery({ query: RATINGS });
                ratings.ratings.push({ ...rating.addRating, id: uniqueString() });
                store.writeQuery({ query: RATINGS, data: ratings });
              },
              refetchQueries: [
                {
                  query: STATS,
                },
              ],
            })
            .then(_ => this.props.reset());
        }} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(reset('feedback')),
});

export default connect(null, mapDispatchToProps)(FormWrapper);
