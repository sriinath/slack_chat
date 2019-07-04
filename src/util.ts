class Util {
    fetchResponse(url: string, options: any, defaultReturnValue?: {} | []) {
        return fetch(url, options)
        .then(data => data.json())
        .then(data => {
            return {
                status: 'success', 
                data
            }
        })
        .catch(err => {
            console.log(err)
            return {
                status: 'failure',
                data: defaultReturnValue
            }
        })
    }
}

const Utils = new Util()
export { Utils } 