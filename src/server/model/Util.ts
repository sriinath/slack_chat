import mongoDB = require('mongodb')
import { config } from '../config'
import console = require('console');

const mongoClient = mongoDB.MongoClient
const { dbURL, dbName } = config

class Utils {
    private dbConnect() {
        return mongoClient.connect(dbURL, {
            useNewUrlParser : true
        })
    }
    private getCollection(collectionName: string) {
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
                else if(collection && collection.name && collection.name == 'MongoNetworkError') {
                    return 'Network error during Mongo Connect'
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
    insertData(collectionName: string, insertData: any) {
        if(collectionName) {
            return this.getCollection(collectionName)
            .then((collection: mongoDB.Collection) => {
                return collection.insertOne(insertData)
                .then(data => {
                    console.log(data)
                    return data
                })
                .catch(err => {
                    console.log(err)
                    return 'An error occured while inserting data to db' 
                })
            })
            .catch(err => {
                console.log(err)
                return 'An error occured while fetching collection results'
            })    
        }
        else {
            return Promise.resolve('Collection Name is mandatory')
        }
    }
    checkDuplicateAndUpdate(collectionName: string, toFind: any, updatedData: any) {
        if(collectionName) {
            return this.getCollection(collectionName)
            .then((collection: any) => {
                return collection.findAndModify(toFind, {}, {$set: updatedData}, {upsert: true})
                .then((data: any) => data)
                .catch((err: mongoDB.MongoError) => {
                    console.log(err)
                    return 'An error occured while inserting data to db' 
                })
            })
            .catch(err => {
                console.log(err)
                return 'An error occured while fetching collection results'
            })
        }
        else {
            return Promise.resolve('Collection Name is mandatory')
        }
    }
    updateData(collectionName: string, toFind: any, updatedData: string) {
        if(collectionName) {
            return this.getCollection(collectionName)
            .then((collection: any) => {
                return collection.updateOne(toFind, updatedData)
                .then((data: any) => data)
                .catch((err: mongoDB.MongoError) => {
                    console.log(err)
                    return 'An error occured while fetching collection results'
                })
            })
            .catch(err => {
                console.log(err)
                return 'An error occured while fetching collection results'
            })
        }
        else {
            return Promise.resolve('Collection Name is mandatory')
        }
    }
}
const UtilModel = new Utils()

export {
    UtilModel
}