# React Assisted Token Example

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Quick Start
In this example, an API call is made to an API using an access token received from a Curity server after authentication using the "assisted token flow".
The client uses the React framework and shows how to use this development tool to perform the assisted token flow.
For that, it calls a RESTful API that is hosted in a separate node server. To start both, simply invoke the following command:

```nodemon
npm start
```

Then, navigate to http://localhost:3000 in a web browser.  

You can make changes to the React single-page application (SPA) to perform your own experimentation. 
If you do, it the changes you make to the app's source files will automatically reload. 
If you change the API that the client invokes, you do not need to start the node API server. 
To do this, run `npm run run-app` instead of `npm start`.
If you want to start only the API, you can do so with the command `node server/server.js`.



## Build app for production

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Curity Config
In order to run this example you need to make some configurations in Curity server.    
The easiest way is to [download and install the sample configuration](https://developer.curity.io/release/2.3.1/configuration-samples) from curity docs.   
This sample configuration has already configured one `Authentication Profile` and one `OAuth Profile`. The `OAuth Profile` also has an app configured (`client-assisted-example`).   
If you are not using the sample configuration, then you need to make sure that atleast these configuration requirements are met before you make the following changes.    

1. Login into the Admin UI and update license under `System -> General`.
    ![image](./docs/images/license.png)
     
2. Go to OAuth profile and make sure that `Code Flow`, `Implicit Flow` and `Assisted Token` `Client Capabilities` are enabled under `Token Service -> General`.
    ![image](./docs/images/client-capabilities.png)
    
3. Go to the `Token Service -> Apps` and edit `client-assisted-example`.
    ![image](./docs/images/oauth-apps.png)   

4. On `Token Service -> Apps -> Edit App(client-assisted-example)` page, make sure that  `Implicit Flow` and `Assisted Token` are enabled under `Client Capabilities` section.
    ![image](./docs/images/oauth-app1.png)  
    

5. Update the `Redirect URIs` and `Allowed Origins` for `client-assisted-example` OAuth App.
    ![image](./docs/images/oauth-app2.png)   
       
6. Commit the changes and you are all setup.


If you compare the final config with the sample config, then you will find the following salient differences.

```xml
<client-store>
    <config-backed>
        <client>
            <id>client-assisted-example</id>
            <redirect-uris>http://localhost:3000</redirect-uris>
            <allowed-origins>*</allowed-origins>
            <capabilities>
                <implicit/>
                <assisted-token/>
            </capabilities>
        </client>
        <!-- ... -->
    </config-backed>
</client-store>       
```

## Integrate with React App  
To integrate this example into any of React app, you need to copy `App Component` (`App.js`) and `constants.js` files into your project.    


The last thing is to configure environment variables like `ISSUER`, `CLIENT_ID`, `API_URL` and `AUTH_SERVER_ORIGIN` in `constants.js` file.
You can see the following example environment config.

```javascript
export const ISSUER = "https://localhost:8443/~";
export const CLIENT_ID = "client-assisted-example";
export const API_URL = "http://127.0.0.1:8100";
export const AUTH_SERVER_ORIGIN = "http://127.0.0.1:8100";
```

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## More Information
For more information about Curity, its capabilities, and how to use it with React and other app development frameworks, visit [developer.curity.io](https://developer.curity.io/). For background information on using Curity for API access, consult the [API integration section of the Curity developer manual](https://support.curity.io/docs/2.0.2/developer-guide/api-integration/overview.html). For additional insights in how to use Curity with microservices and APIs from SPAs, read _[How to Control User Identity within Microservices](http://nordicapis.com/how-to-control-user-identity-within-microservices/)_ on the Nordic APIs blog. You may also be interested in validating tokens sent from the React front-end in a gateway like [Apigee](https://developer.curity.io/tutorials/apigee-integration) or [NGINX](https://github.com/curityio/nginx_phantom_token_module). 

## Licensing

This software is copyright (C) 2018 Curity AB. It is open source software that is licensed under the [Apache 2](LICENSE).
