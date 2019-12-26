import React, {Component} from 'react';
import {
    API_URL,
    AUTH_SERVER_ORIGIN,
    CLIENT_ID,
    ErrorCode,
    ISSUER,
    OPENID_CONFIGURATION_URL,
    ParameterName,
} from './constants';
import axios from 'axios';

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
            button = <button onClick={this.getToken}>Login</button>;
        }
        else {
            button = <button onClick={this.getToken}>Get Token</button>;
            callApiBtn = <button onClick={this.callApi}>Call Api</button>;
            if (this.userToken) {
                tokenData = <label>Token: {this.userToken}</label>;
            }
            if (this.apiResponse) {
                apiResponseData = <label>{this.apiResponse}</label>;
            }

        }

        return (
            <div className="App">
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
        axios.get(ISSUER + OPENID_CONFIGURATION_URL).then(response => {
            this.config = response.data;
            console.log(response);
            this.addScriptToIndexFile();
            this.checkAuthorization();
            this.tryLoadTokenAssistant();
        });
    };

    tryLoadTokenAssistant() {
        if (window.curity) {
            if (!this.tokenAssistant) {
                this.loadTokenAssistant();
            }
        }
        else {
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
        var script = window.document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.config.assisted_token_endpoint +
            '/resources/js/assisted-token.min.js';
        script.id = 'assisted-token-js-script';
        head.appendChild(script);
    }

    loadTokenAssistant() {
        if (!window.curity) {
            throw new Error('Assisted token javascript was not found.' +
                ' Make sure the server is running and/or update URL ' +
                'of #assisted-token-js-script script');
        }
        this.tokenAssistant = window.curity.token.assistant({
            clientId: CLIENT_ID,
        });
    }

    callApi() {
        const isUserAuthenticated = this.tokenAssistant.isAuthenticated() &&
            !this.tokenAssistant.isExpired();
        if (isUserAuthenticated) {
            this.userToken = this.tokenAssistant.getAuthHeader();
            axios.get(API_URL + '/api').then(response => {
                this.apiResponse = response.data.data;
                this.setState({isLoggedIn: true});
            }).catch(errorResponse => {
                this.apiResponse = errorResponse.error;
            });
        }
        else {
            this.tokenAssistant.loginIfRequired().then((token) => {
                this.callApi();
            }).fail((err) => {
                console.log('Failed to retrieve tokens', err);
            });
        }
    }

    getToken() {
        if (!this.tokenAssistant) {
            alert('Token Assistant is undefined.');
            return false;
        }
        this.tokenAssistant.loginIfRequired().then((msg) => {
            if (!this.state.isLoggedIn) {
                const href = window.origin + '?user=true';
                window.history.pushState({path: href}, '', href);
            }
            this.userToken = this.tokenAssistant.getAuthHeader();
            this.setState({isLoggedIn: true});
        }).fail((err) => {
            console.log('Failed to retrieve tokens', err);
        });
    }

    addAuthIntercepter() {
        // Add a request interceptor
        axios.interceptors.request.use((config) => {
            if (AUTH_SERVER_ORIGIN === new URL(config.url).origin) {
                config.headers.authorization = this.userToken;
            }
            else {
                config.headers.authorization = null;
            }
            return config;
        }, function(error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }

    checkAuthorization() {
        const userParam = this.getParameterByName(ParameterName.USER);
        const errorParam = this.getParameterByName(ParameterName.ERROR);
        const idTokenParam = this.getParameterByName(ParameterName.ID_TOKEN);

        if (userParam) {
            if (userParam === 'true') {
                this.setState({isLoggedIn: true});
            }
        }
        else if (errorParam === ErrorCode.LOGIN_REQUIRED || errorParam ===
            ErrorCode.INVALID_REQUEST) {
            const href = window.origin + '?user=false';
            window.history.pushState({path: href}, '', href);
        }
        else if (idTokenParam) {
            const href = window.origin + '?user=true';
            window.history.pushState({path: href}, '', href);
        }
        else {
            let nonceArray = window.crypto.getRandomValues(new Uint8Array(8));
            let nonce = '';
            for (let item in nonceArray) {
                if (nonceArray.hasOwnProperty(item)) {
                    nonce += nonceArray[item].toString();
                }
            }
            window.location.href = this.config.authorization_endpoint +
                `?response_type=id_token&client_id=${CLIENT_ID}` +
                `&redirect_uri=${window.origin}&prompt=none&nonce=${nonce}`;
        }
    }

    getParameterByName(name) {
        const url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?#&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

export default App;
