import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {ISSUER} from "./constants";
import axios from "axios";

class App extends Component {
    config = {};

    constructor() {
        super();
        this.loadConfiguration();
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }


    loadConfiguration() {
        axios.get(ISSUER + "/.well-known/openid-configuration")
            .then(response => {
                this.config = response;
                console.log(response);
            });
    }
}

export default App;
