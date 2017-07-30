// Source: https://nodejs.org/api/http.html
// Source: https://github.com/JosephMoniz/rx-http-server
// Source: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/fromevent.md

import http from 'http'
import Rx from 'rx'

export default class HttpServer {
    constructor(port = 80) {
        this.server = http.createServer()
        this.server.listen(port)
    }
    get checkContinues() {
        return Rx.Observable.fromEvent(this.server, 'checkContinue', (request, response) =>
            Object.create({ request, response }))
    }
    get clientErrors() {
        return Rx.Observable.fromEvent(this.server, 'clientError', (request, socket) => {
            // https://nodejs.org/api/http.html#http_event_clienterror
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
            return { request, socket }
        })
    }
    get closes() {
        return Rx.Observable.fromEvent(this.server, 'close', () => 'close')
    }
    get requests() {
        return Rx.Observable.fromEvent(this.server, 'request', (request, response) =>
            Object.create({ request, response }))
    }
    get upgrades() {
        return Rx.Observable.fromEvent(this.server, 'checkContinue', (request, socket, head) =>
            Object.create({ request, socket, head }))
    }
}
