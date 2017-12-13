// Schema for sample GraphQL server.

// ----------------------
// IMPORTS

// GraphQL schema library, for building our GraphQL schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import taffy from 'taffy';

import uniqueString from 'unique-string';
// ----------------------

const ratings = taffy([
  {
    id: '324234SADxSA',
    rating: 1,
    comment: 'The best ever',
    name: 'John',
    email: 'john@john.photo',
  },
  {
    id: 'xg4weeasd',
    rating: 5,
    comment: 'The worst ever',
    name: 'Anna',
    email: 'anna@anna.photo',
  },
]);

// Message type.  Imagine this like static type hinting on the 'message'
// object we're going to throw back to the user
const Rating = new GraphQLObjectType({
  name: 'Rating',
  description: 'Rating',
  fields() {
    return {
      rating: {
        type: GraphQLInt,
        resolve(rating) {
          return rating.rating;
        },
      },
      comment: {
        type: GraphQLString,
        resolve(rating) {
          return rating.comment;
        },
      },
      name: {
        type: GraphQLString,
        resolve(rating) {
          return rating.name;
        },
      },
      email: {
        type: GraphQLString,
        resolve(rating) {
          return rating.email;
        },
      },
      id: {
        type: GraphQLString,
        resolve(rating) {
          return rating.id;
        },
      },
    };
  },
});

const Stats = new GraphQLObjectType({
  name: 'Stats',
  description: 'Stats',
  fields() {
    return {
      one: {
        type: GraphQLInt,
        resolve(stats) {
          return stats.one;
        },
      },
      two: {
        type: GraphQLInt,
        resolve(stats) {
          return stats.two;
        },
      },
      three: {
        type: GraphQLInt,
        resolve(stats) {
          return stats.three;
        },
      },
      four: {
        type: GraphQLInt,
        resolve(stats) {
          return stats.four;
        },
      },
      five: {
        type: GraphQLInt,
        resolve(stats) {
          return stats.five;
        },
      },
      zero: {
        type: GraphQLInt,
        resolve(stats) {
          return stats.zero;
        },
      },
    };
  },
});

const Ratings = new GraphQLList(Rating);

// Root query.  This is our 'public API'.
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return {
      ratings: {
        type: Ratings,
        resolve() {
          return ratings().get();
        },
      },
      stats: {
        type: Stats,
        resolve() {
          const data = {
            one: ratings()
              .filter({ rating: 1 })
              .count(),

            two: ratings()
              .filter({ rating: 2 })
              .count(),

            three: ratings()
              .filter({ rating: 3 })
              .count(),

            four: ratings()
              .filter({ rating: 4 })
              .count(),

            five: ratings()
              .filter({ rating: 5 })
              .count(),

            zero: ratings()
              .filter({ rating: 0 })
              .count(),
          };
          return data;
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation object',
  fields() {
    return {
      addRating: {
        type: Rating,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          comment: { type: GraphQLString },
          rating: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(value, { name, email, comment, rating }) {
          const r = { name, email, comment, rating, id: uniqueString() };
          ratings.insert(r);

          return r;
        },
      },
    };
  },
});

// The resulting schema.  We insert our 'root' `Query` object, to tell our
// GraphQL server what to respond to.  We could also add a root `mutation`
// if we want to pass mutation queries that have side-effects (e.g. like HTTP POST)
export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
