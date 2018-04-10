const _ = require('lodash')

const Authors = require('./data/authors')
const Posts = require('./data/posts')

let {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema
} = require('graphql')

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    twitterHandle: {type: GraphQLString}
  })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represent a post of author',
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: new GraphQLNonNull(GraphQLString)},
    author: {
      type: AuthorType,
      resolve: (post) => {
        return _.find(Authors, a => a.id == post.author_id)
      }
    }
  })
})

const AppQueryRootType = new GraphQLObjectType({
  name: 'ItestedItAppSchema',
  description: 'I-tested-it Application Schema query root',
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of all authors',
      resolve: () => {
        return Authors
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: 'List of all Posts',
      resolve: () => {
        return Posts
      }
    }
  })
})

const AppSchema = new GraphQLSchema({
  query: AppQueryRootType,
  // mutations: AppMutationsRootType
})

module.exports = AppSchema

