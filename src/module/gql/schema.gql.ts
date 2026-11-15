import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userGqlSchema } from "../user/gql/user.schema.gql";
import { postGqlSchema } from "../post/gql/post.schema.gql";


const query = new GraphQLObjectType({
    name : "RootQuery",
    fields: {
        ...userGqlSchema.registerQuery(),
        ...postGqlSchema.registerQuery()
    }
})

const mutation = new GraphQLObjectType({
    name : "RootMutation",
    fields: {
        ...postGqlSchema.registerMutation()
    }
})




export const schema = new GraphQLSchema({query , mutation})