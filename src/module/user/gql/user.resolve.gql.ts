


class UserResolver {
    constructor(){ }


    helloWorldResolver(parent : any , args : any){
        let {name  ,email , password} = args
        return {message : `your name is ${name} and your email is${email}  pass => ${password}`}

    }
}


export const userresolver = new UserResolver