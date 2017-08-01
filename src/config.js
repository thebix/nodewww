const isProduction = process.env.NODE_ENV === 'production'

export default {
    isProduction,
    log: isProduction ? 'INFO' : 'DEBUG',
    dirStorage: `${__dirname}/storage/`,
    http: { // this property enables http server, comment if not needed
        port: 1488,
        wwwroot: `${__dirname}/public`
    }
}
