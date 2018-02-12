import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {API_URL, AUTH_SERVER_ORIGIN, CLIENT_ID, ISSUER} from "./constants";
import axios from "axios";

class App extends Component {
    config = {};
    count = 0;
    tokenAssistant;
    apiResponse;

    constructor() {
        super();
        this.getToken = this.getToken.bind(this);
        this.callApi = this.callApi.bind(this);
        this.state = {isLoggedIn: false};
        this.loadConfiguration();
        this.addAuthIntercepter();
    }

    render() {

        let button = null;
        let callApiBtn = null;
        let tokenData = null;
        let apiResponseData = null;

        if (!this.state.isLoggedIn) {
            button = <button onClick={this.getToken}>Login</button>
        } else {
            button = <button onClick={this.getToken}>Get Token</button>
            callApiBtn = <button onClick={this.callApi}>Call Api</button>
            if (this.userToken) {
                tokenData = <label>Token: {this.userToken}</label>
            }
            if (this.apiResponse) {
                apiResponseData = <label>{this.apiResponse}</label>
            }

        }

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    {button}
                    <br/>
                    {tokenData}

                    <br/>
                    {callApiBtn}

                    <br/>
                    {apiResponseData}
                </p>
            </div>
        );
    }


    loadConfiguration() {
        axios.get(ISSUER + "/.well-known/openid-configuration")
            .then(response => {
                this.config = response.data;
                console.log(response);
                this.addScriptToIndexFile();
                // this.checkAuthorization();
                this.tryLoadTokenAssistant();
            });
    }


    tryLoadTokenAssistant() {
        if (window.curity) {
            if (!this.tokenAssistant) {
                this.loadTokenAssistant();
            }
        } else {
            setTimeout(() => {
                this.count++;
                if (this.count > 100) {
                    return false;
                }
                this.tryLoadTokenAssistant();
            }, 20);
        }
    }

    addScriptToIndexFile() {
        var head = window.document.head;
        var script = window.document.createElement("script");
        script.type = 'text/javascript';
        script.src = this.config.assisted_token_endpoint + "/resources/js/assisted-token.min.js";
        script.id = "assisted-token-js-script";
        head.appendChild(script);
    }

    loadTokenAssistant() {
        if (!window.curity) {
            throw new Error("Assisted token javascript was not found." +
                " Make sure the server is running and/or update URL " +
                "of #assisted-token-js-script script");
        }
        this.tokenAssistant = window.curity.token.assistant({
            clientId: CLIENT_ID
        });
    }

    callApi() {
        this.tryLoadTokenAssistant();
        this.tokenAssistant.loginIfRequired().then(() => {
            this.userToken = this.tokenAssistant.getAuthHeader();
            axios.get(API_URL + "/api")
                .then(response => {
                    this.apiResponse = response.data.data;
                    this.setState({isLoggedIn: true});
                })
                .catch(errorResponse => {
                    this.apiResponse = errorResponse.error;
                });
        }).fail((err) => {
            console.log("Failed to retrieve tokens", err);
        });
    }

    getToken() {
        this.tryLoadTokenAssistant();
        if (!this.tokenAssistant) {
            alert("Token Assistant is undefined.");
            return false;
        }
        this.tokenAssistant.loginIfRequired().then(() => {
            this.setState({isLoggedIn: true});
            this.userToken = this.tokenAssistant.getAuthHeader();
            console.log("Token " + this.userToken);

        }).fail((err) => {
            console.log("Failed to retrieve tokens", err);
        });
    }

    addAuthIntercepter() {
        // Add a request interceptor
        axios.interceptors.request.use((config) => {
            if (AUTH_SERVER_ORIGIN === new URL(config.url).origin) {
                config.headers.authorization = this.userToken;
            } else {
                config.headers.authorization = null;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }
}

export default App;
