import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers' // resolvers.js 파일 생성

const typeDefs = `
    type User {
        _id: ID!
        name: String!
        age: Int!
        id: String!
        pwd: String!
        lv: Int!
        inCnt: Int!
        email: String!
        photo: String!
        googleId: String!
        facebookId: String!
        snsToken: String!
        termsAgree: Boolean!
        approval: Boolean!
        retry: Int!
    }

    type Query {
        allUser: [User]
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;