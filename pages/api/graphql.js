import { ApolloServer, gql } from 'apollo-server-micro';
import resolversMethods from '../../graphql/resolvers';

const typeDefs = gql`
  type Query {
    videogame(id: ID!): VideoGame!
    videogames: [VideoGame!]!
  }
  type Mutation {
    createVideogame(name: String!, genre:String, platform: String, score: Int): VideoGame!
    updateVideogame(id: ID!, name: String!, genre:String, platform: String, score: Int): VideoGame!
    deleteVideogame(id: ID!): Boolean
  }
  type VideoGame {
    id: ID,
    name: String,
    genre: String,
    platform: String,
    score: Int,
  }
`;

const resolvers = {
  Query: {
    async videogame(root, args) {
      return resolversMethods.videogame(args);
    },
    async videogames() {
      return resolversMethods.videogames();
    },
  },
  Mutation: {
    async createVideogame(root, args) {
      return resolversMethods.createVideogame(args);
    },
    async updateVideogame(root, args) {
      return resolversMethods.updateVideogame(args);
    },
    async deleteVideogame(root, args) {
      return resolversMethods.deleteVideogame(args);
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
