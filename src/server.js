import { log, logLevel } from './logger'
import _config from './config'
import lib from './lib/index'

log(`Start server ${_config.isProduction ? '<Production>' : '<Debug>'}`, logLevel.INFO)

log(lib.time.dateTimeString())

lib.www.response.subscribe(st => {
    const { status, data } = st
    if (status !== '//TODO: STATUS_404') {
        data.response.writeHead(200, { 'Content-Type': 'text/plain' })
        data.response.write('404 Not Found\n')
        data.response.end()
    }
})
