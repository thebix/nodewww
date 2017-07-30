// Source: https://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server

import url from 'url'
import path from 'path'
import Rx from 'rx'

import lib from './index'
import HttpServer from './http-server'

const mimeTypes = {
    html: 'text/html',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    js: 'text/javascript',
    css: 'text/css'
}

export default class WwwServer {
    constructor(port = 80, wwwroot = './') {
        this.httpServer = new HttpServer(port)
        this.wwwroot = wwwroot
    }
    get response() {
        return this.httpServer.requests
            .concatMap(data => {
                const uri = url.parse(data.request.url).pathname
                const filename = path.join(process.cwd(), this.wwwroot, uri !== '/' ? uri : 'index.html')
                return lib.fs.accessRead(filename)
                    .map(isExists => Object.create({ data, filename, isExists }))
            })
            .flatMap(file => {
                const { isExists, data, filename } = file
                if (!isExists) {
                    console.log(`not exists: ${filename}`)
                    data.response.writeHead(200, { 'Content-Type': 'text/plain' })
                    data.response.write('404 Not Found\n')
                    data.response.end()
                    return Rx.Observable.just({ data, status: '//TODO: STATUS_404' })
                }

                const mimeType = mimeTypes[path.extname(filename).split('.')[1]]
                data.response.writeHead(200, { 'Content-Type': mimeType })

                return lib.fs.createReadStream(filename)
                    .map(fileStream => {
                        fileStream.pipe(data.response)
                        return { data, status: '//TODO: STATUS_200' }
                    })
                    // INFO: not working
                    .catch(() => Object.create({ data, status: '//TODO: STATUS_CAN\'T_CREATE_READ_STREAM' }))
            })
    }
}
