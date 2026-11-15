import { GraphQLBoolean, GraphQLEnumType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GenderEnum, providerEnum, RoleEnum } from "../../../common/enums/user.enum";




export const helloworldQueryTypes = new GraphQLObjectType({
    name : "HellowoledQuery",
    fields: {
        message : {
            type : GraphQLString
        }
    }
})


export const oneUserType = new GraphQLObjectType({
    name : "oneUserType",
    fields :{
        userName : {type : new GraphQLNonNull(GraphQLString)},
        firstName : {type : GraphQLString},
        lastName : {type : GraphQLString},
        email : {type : GraphQLString},
        phone : {type : GraphQLString},
        password : {type : GraphQLString},
        profilePic: {type : GraphQLString},
        confirmEmail : {type : GraphQLBoolean},
        gender : {type :new GraphQLEnumType({
            name : "GenderEnumsGQL",
            values :{
                Male : {value : GenderEnum.male},
                Female : {value : GenderEnum.female}
            }
        })},
        provider : {type : new GraphQLEnumType({
            name : "ProviderEnums",
            values : {
                system : {value : providerEnum.system},
                Google : {value : providerEnum.google}
            }
        })},
        role : {type : new GraphQLEnumType({
            name : "RoleEnumsType",
            values :{
                Admin : {value : RoleEnum.Admin},
                User : {value : RoleEnum.user}
            }
        })}
    } 
        
})