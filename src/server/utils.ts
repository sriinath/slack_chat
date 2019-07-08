class Utils {
    returnResp(data: any, status: string, statusCode?: number, message?: string) {
        return {
            data,
            status,
            message: message || 'Data is retreived successfully',
            code: statusCode || '200'
        }
    }
}

const Util = new Utils()
export { Util }