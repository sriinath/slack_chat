import mongoDB = require('mongodb')
import { config } from '../config'

const mongoClient = mongoDB.MongoClient
const { dbURL, dbName } = config

class Utils {
    dbConnect() {
        return mongoClient.connect(dbURL, {
            useNewUrlParser : true
        })
    }
    getCollection(collectionName: string) {
        if(collectionName) {
            return this.dbConnect()
            .then((db: mongoDB.MongoClient) => {
                return db.db(dbName).collection(collectionName)
            })
            .catch((err: mongoDB.MongoError) => {
                return err
            })    
        }
    }
    connectDBCollection(collectionName: string, callback: Function) {
        if(collectionName) {
            return this.getCollection(collectionName)
            .then((collection: any) => {
                if(collection && collection.code && collection.code == 'ECONNREFUSED') {
                    return 'Database cannot be connected'
                }
                else {
                    return callback(collection)
                }
            })
            .catch((err: mongoDB.MongoError) => {
                console.log('An error occured while connecting to database')
                console.log(err)
                return err
            })    
        }
        else {
            return Promise.resolve('Colllection name is not valid string')
        }
    }
    findData(collection: mongoDB.Collection, query: Object, limit?: number, offset?: number) {
        return collection.find(query, { fields: {_id: 0} } )
        .limit(limit)
        .skip(offset)
        .toArray()
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
            return 'An error occured while fetching collection results'
        })
    }
    getData(collectionName: string, toFind: Object, limit?: number, offset?: number) {
        const limitValue = limit || 20 
        const skip = offset || 0
        // find data is a callback method
        const findData = (collection: mongoDB.Collection) => {
            return this.findData(collection, toFind, limitValue, skip)
        }
        return this.connectDBCollection(collectionName, findData)
    }
}
const UtilModel = new Utils()

export {
    UtilModel
}