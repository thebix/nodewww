import { RxFileSystem } from './fs'
import Time from './time'
import WwwServer from './www-server'
import config from '../config'

const fs = new RxFileSystem()
const time = new Time()
const www = config.http ? new WwwServer(config.http.port, config.http.wwwroot) : null

export default {
    fs,
    time,
    www
}
