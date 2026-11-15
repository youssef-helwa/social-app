import mongoose, { Model, PopulateOptions } from "mongoose";
import { IUser } from "../../common/interfaces/user.interface";



export class DataBaseReposatory <TRowDoc> {
    

    constructor(private model : Model<TRowDoc>) {
    }


    create(data :TRowDoc){
        return this.model.create(data)
    }

    findAll({select , lean , populate , filter} : {
        select?: string,
        populate?: PopulateOptions[],
        lean?: boolean,
        filter ?: mongoose.QueryFilter<TRowDoc>
    } = {}) {
        let query : any = this.model.find(filter || {})
        if(select) {
            query = query.select(select)
        }
        if(populate) {
            query = query.populate(populate)
        }
        if(lean) {
            query = query.lean(lean)
        }
        return query
    }

    findone({filter , select , lean , populate} : {
        filter: object,
        select?: string,
        populate?: string,
        lean?: boolean
    }) {
        let query : any = this.model.findOne(filter)
        
        if(select) {
            query = query.select(select)
        }
        if(populate) {
            query = query.populate(populate)
        }
        if(lean) {
            query = query.lean(lean)
        }
        return query
    }

    findById({id , select , lean , populate} : {
        id : number,
        select?: string,
        populate?: string,
        lean?: boolean
    }) {
        let query : any = this.model.findById(id)
        if(select) {
            query = query.select(select)
        }
        if(populate) {
            query = query.populate(populate)
        }
        if(lean) {
            query = query.lean(lean)
        }
        return query
    }

    updateOne({filter , data} : {
        filter : any
        data : any
    }) {
        return this.model.updateOne(filter , data)
    }
    deleteOne({filter} : {
        filter : any
    }) {
        return this.model.deleteOne(filter)
    }
}