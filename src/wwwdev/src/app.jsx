import React, { Component } from 'react'
import '../css/index.scss'

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>It Works!</h1>
                <p>This React project just works including
                    &nbsp;<span className="redBg">module</span> local styles.</p>
            </div>
        )
    }
}
