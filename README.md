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

## Available Scripts

### `npm start`
In this example an api call is made to a node server using the access token received from curity server after authentication.
The sample node server exposes a rest api which mocks an authorized resource. In response of mock api call, the server returns the access token used to access the resource.
You only need to run this server in order to test this example.

Run node server as mentioned below.
```nodemon
node server/server.js
```


Run react app in dev mode.
```nodemon
npm run run-app
```

Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.


In order to run both `node server` and `react app` together, use the following command.

```nodemon
npm start
``` 


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

If you compare the final config with the sample config, then you will find the following differences.

```xml
    <environment>
      <name>demo</name>
      <admin-web-ui>
        <ssl-server-keystore>default-admin-ssl-key</ssl-server-keystore>
      </admin-web-ui>
      <services>
        <zones>
          <default-zone>
            <symmetric-key>00a754e83cadaa9f4d57949f91f1d1cf33309fec6df8047ddb4423f9f9e2fe68</symmetric-key>
          </default-zone>
        </zones>
        <service>
```    

```xml
       <client-store>
            <config-backed>
              <client>
                <id>client-assisted-example</id>
                <redirect-uris>http://localhost:3000</redirect-uris>
                <user-authentication>
                </user-authentication>
                <allowed-origins>*</allowed-origins>
                <capabilities>
                  <implicit/>
                  <assisted-token/>
                </capabilities>
              </client>
```
    
```xml
    <crypto>
      <ssl>
        <server-keystore>
          <id>default-admin-ssl-key</id>
          <keystore>keystore value</keystore>
        </server-keystore>
      </ssl>
      <signing-keys>
        <signing-key>
          <id>default-signing-key</id>
          <keystore>keystore value</keystore>
        </signing-key>
      </signing-keys>
      <signature-verification-keys>
        <signature-verification-key>
          <id>default-signature-verification-key</id>
          <keystore>-----BEGIN CERTIFICATE-----
            keystore value here
            -----END CERTIFICATE-----</keystore>
        </signature-verification-key>
      </signature-verification-keys>
    </crypto>
```    

```xml
  <processing xmlns="https://curity.se/ns/conf/base">
    <license-key>eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJDdXJpdHkgQUIiLCJzdWIiOiJDdXJpdHkgQUIiLCJJZCI6InUydU9pWWV0VlR0U0JzcTQzZnB6d3RGaERFaUNTT3BsIiwiUHJvZHVjdCI6IklkZW50aXR5IFNlcnZlciIsIlZlcnNpb24iOiIyLjAiLCJGZWF0dXJlIjoiYXV0aG4sIG9hdXRoLCBvaWRjLCB1c2VyLW1hbmFnZW1lbnQsIGFzc2lzdGVkLXRva2VuLCBwbHVnaW5zIiwiVGllciI6IlN1YnNjcmlwdGlvbiIsIkdyYWNlIFBlcmlvZCI6IjAiLCJJc3N1ZSBEYXRlIjoiMjAxNy0xMS0wMyIsIkV4cGlyYXRpb24gRGF0ZSI6IjIwMTgtMDItMjgifQ.aeCZe3LkfyNepqaNzeEa-DykZx3yCLAL4XPOuTtw1O_C9uZKiNTRonOEmRw8mff6W-vGTHVFGAKhKEJP1MIHMaBfN5fKGNcBGTQtp__nMLJN_FOLr6Z_uDOMvADADMn0G4I-Ybgk6VHDnBX42vBnpzJuvkK-QkB8P1xXR8CRNHkzAc5hT2m4YIkUMJalpJmR4-Jb5wTcaok8kx4nCpkLbGAfKm1Rj-qV328i2R0TUDqoZKlCt-3zQRWrKmmhe9qbSoG7B9q2tjDcAgNZsDDIOZjEkOnSzTL0WfQoS3ZJVexRJctnp7GnMHeIH2rUCuvUBhGlCoZuOxZNJKnMCNvycg</license-key>
    <procedures>
      <token-procedure>
        <id>assisted-token-procedure</id>
        <flow>oauth-assisted-token</flow>
        <script>LyoqCiAqCiAqIFRoaXMgdG9rZW4gcHJvY2VkdXJlIGlzIHVzZWQgdG8gY3JlYXRlIHRoZSBkYXRhIHRoYXQgd2lsbCBiZSBwb3N0ZWQgKHZpYSBhIEpTIHNjcmlwdCkKICogdG8gdGhlIEhUTUwgZnJhbWUgdGhhdCBpcyBleHBlY3RlZCB0byB1c2UgdGhlIGFzc2lzdGVkIHRva2VuLgogKgogKiBAcGFyYW0gY29udGV4dCBpbnN0YW5jZSBvZiBBc3Npc3RlZFRva2VuUHJvY2VkdXJlQ29udGV4dC4KICogQHJldHVybnMgZGF0YSB0byBwb3N0IHRvIHRoZSBIVE1MIGZyYW1lCiAqLwpmdW5jdGlvbiByZXN1bHQoY29udGV4dCkgewogICAgaWYgKGNvbnRleHQuaXNzdWVkVG9rZW4pIHsKICAgICAgICB2YXIgZXhwaXJlc0luID0gc2Vjb25kc1VudGlsKGNvbnRleHQuaXNzdWVkVG9rZW4uZXhwaXJlc0F0KTsKCiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgc3RhdHVzOiAic3VjY2VzcyIsCiAgICAgICAgICAgIGFjY2Vzc190b2tlbjogY29udGV4dC5pc3N1ZWRUb2tlbi52YWx1ZSwKICAgICAgICAgICAgZXhwaXJlc19pbjogZXhwaXJlc0luLAogICAgICAgICAgICBzY29wZTogY29udGV4dC5pc3N1ZWRUb2tlbi5zY29wZSwKICAgICAgICAgICAgc3ViamVjdDogY29udGV4dC5pc3N1ZWRUb2tlbi5zdWJqZWN0CiAgICAgICAgfTsKICAgIH0KCiAgICB2YXIgZGVsZWdhdGlvbkRhdGEgPSBjb250ZXh0LmdldERlZmF1bHREZWxlZ2F0aW9uRGF0YSgpOwogICAgdmFyIGlzc3VlZERlbGVnYXRpb24gPSBjb250ZXh0LmRlbGVnYXRpb25Jc3N1ZXIuaXNzdWUoZGVsZWdhdGlvbkRhdGEpOwoKICAgIHZhciBhY2Nlc3NUb2tlbkRhdGEgPSBjb250ZXh0LmdldERlZmF1bHRBY2Nlc3NUb2tlbkRhdGEoKTsKICAgIHZhciBpc3N1ZWRBY2Nlc3NUb2tlbiA9IGNvbnRleHQuYWNjZXNzVG9rZW5Jc3N1ZXIuaXNzdWUoYWNjZXNzVG9rZW5EYXRhLCBpc3N1ZWREZWxlZ2F0aW9uKTsKCiAgICByZXR1cm4gewogICAgICAgIHN0YXR1czogInN1Y2Nlc3MiLAogICAgICAgIGFjY2Vzc190b2tlbjogaXNzdWVkQWNjZXNzVG9rZW4sCiAgICAgICAgZXhwaXJlc19pbjogc2Vjb25kc1VudGlsKGFjY2Vzc1Rva2VuRGF0YS5leHApLAogICAgICAgIHNjb3BlOiBhY2Nlc3NUb2tlbkRhdGEuc2NvcGUsCiAgICAgICAgc3ViamVjdDogY29udGV4dC5zdWJqZWN0QXR0cmlidXRlcygpLnN1YmplY3QKICAgIH07Cn0K</script>
      </token-procedure>
      <token-procedure>
        <id>authorize-authorization-code</id>
        <flow>oauth-authorize-authorization-code</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBhdXRob3JpemF0aW9uQ29kZURhdGEgPSBjb250ZXh0LmdldERlZmF1bHRBdXRob3JpemF0aW9uQ29kZURhdGEoKTsKICAgIHZhciBpc3N1ZWRBdXRob3JpemF0aW9uQ29kZSA9IGNvbnRleHQuYXV0aG9yaXphdGlvbkNvZGVJc3N1ZXIuaXNzdWUoYXV0aG9yaXphdGlvbkNvZGVEYXRhKTsKCiAgICByZXR1cm4gewogICAgICAgIGNvZGU6IGlzc3VlZEF1dGhvcml6YXRpb25Db2RlLAogICAgICAgIHN0YXRlOiBjb250ZXh0LnByb3ZpZGVkU3RhdGUKICAgIH07Cn0=</script>
      </token-procedure>
      <token-procedure>
        <id>authorize-hybrid</id>
        <flow>openid-authorize-hybrid</flow>
        <script>LyoKICogQ29weXJpZ2h0IChDKSAyMDE3IEN1cml0eSBBQi4gQWxsIHJpZ2h0cyByZXNlcnZlZC4KICoKICogVGhlIGNvbnRlbnRzIG9mIHRoaXMgZmlsZSBhcmUgdGhlIHByb3BlcnR5IG9mIEN1cml0eSBBQi4KICogWW91IG1heSBub3QgY29weSBvciB1c2UgdGhpcyBmaWxlLCBpbiBlaXRoZXIgc291cmNlIGNvZGUKICogb3IgZXhlY3V0YWJsZSBmb3JtLCBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRlcm1zCiAqIHNldCBieSBDdXJpdHkgQUIuCiAqCiAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uLCBwbGVhc2UgY29udGFjdCBDdXJpdHkgQUIuCiAqLwoKZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBhdXRob3JpemF0aW9uQ29kZURhdGEgPSBjb250ZXh0LmdldERlZmF1bHRBdXRob3JpemF0aW9uQ29kZURhdGEoKTsKICAgIHZhciBpc3N1ZWRBdXRob3JpemF0aW9uQ29kZSA9IGNvbnRleHQuYXV0aG9yaXphdGlvbkNvZGVJc3N1ZXIuaXNzdWUoYXV0aG9yaXphdGlvbkNvZGVEYXRhKTsKCiAgICB2YXIgcmVzcG9uc2VEYXRhID0gewogICAgICAgIGNvZGU6IGlzc3VlZEF1dGhvcml6YXRpb25Db2RlLAogICAgICAgIHN0YXRlOiBjb250ZXh0LnByb3ZpZGVkU3RhdGUKICAgIH07CgogICAgdmFyIGlzc3VlZEFjY2Vzc1Rva2VuID0gbnVsbDsKCiAgICB2YXIgYWNjZXNzVG9rZW5EYXRhID0gY29udGV4dC5nZXREZWZhdWx0QWNjZXNzVG9rZW5EYXRhKCk7CiAgICBpZiAoYWNjZXNzVG9rZW5EYXRhKSB7CgogICAgICAgIHZhciBkZWxlZ2F0aW9uRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdERlbGVnYXRpb25EYXRhKCk7CiAgICAgICAgdmFyIGlzc3VlZERlbGVnYXRpb24gPSBjb250ZXh0LmRlbGVnYXRpb25Jc3N1ZXIuaXNzdWUoZGVsZWdhdGlvbkRhdGEpOwoKICAgICAgICBpc3N1ZWRBY2Nlc3NUb2tlbiA9IGNvbnRleHQuYWNjZXNzVG9rZW5Jc3N1ZXIuaXNzdWUoYWNjZXNzVG9rZW5EYXRhLCBpc3N1ZWREZWxlZ2F0aW9uKTsKCiAgICAgICAgcmVzcG9uc2VEYXRhLmFjY2Vzc190b2tlbiA9IGlzc3VlZEFjY2Vzc1Rva2VuCiAgICAgICAgcmVzcG9uc2VEYXRhLnRva2VuX3R5cGUgPSAnYmVhcmVyJwogICAgfQoKICAgIHZhciBpZFRva2VuRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdElkVG9rZW5EYXRhKCk7CiAgICBpZiAoaWRUb2tlbkRhdGEpIHsKCiAgICAgICAgdmFyIGlkVG9rZW5Jc3N1ZXIgPSBjb250ZXh0LmlkVG9rZW5Jc3N1ZXI7CiAgICAgICAgaWRUb2tlbkRhdGEuY19oYXNoID0gaWRUb2tlbklzc3Vlci5jSGFzaChpc3N1ZWRBdXRob3JpemF0aW9uQ29kZSk7CiAgICAgICAgaWRUb2tlbkRhdGEuYXRfaGFzaCA9IGlkVG9rZW5Jc3N1ZXIuYXRIYXNoKGlzc3VlZEFjY2Vzc1Rva2VuKTsKCiAgICAgICAgcmVzcG9uc2VEYXRhLmlkX3Rva2VuID0gaWRUb2tlbklzc3Vlci5pc3N1ZShpZFRva2VuRGF0YSk7CiAgICB9CgogICAgcmV0dXJuIHJlc3BvbnNlRGF0YTsKfQ==</script>
      </token-procedure>
      <token-procedure>
        <id>authorize-implicit</id>
        <flow>oauth-authorize-implicit</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKCiAgICB2YXIgcmVzcG9uc2VEYXRhID0gewogICAgICAgIHN0YXRlOiBjb250ZXh0LnByb3ZpZGVkU3RhdGUKICAgIH07CgogICAgdmFyIGlzc3VlZEFjY2Vzc1Rva2VuID0gbnVsbDsKCiAgICB2YXIgYWNjZXNzVG9rZW5EYXRhID0gY29udGV4dC5nZXREZWZhdWx0QWNjZXNzVG9rZW5EYXRhKCk7CiAgICBpZiAoYWNjZXNzVG9rZW5EYXRhKSB7CgogICAgICAgIHZhciBkZWxlZ2F0aW9uRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdERlbGVnYXRpb25EYXRhKCk7CiAgICAgICAgdmFyIGlzc3VlZERlbGVnYXRpb24gPSBjb250ZXh0LmRlbGVnYXRpb25Jc3N1ZXIuaXNzdWUoZGVsZWdhdGlvbkRhdGEpOwoKICAgICAgICBpc3N1ZWRBY2Nlc3NUb2tlbiA9IGNvbnRleHQuYWNjZXNzVG9rZW5Jc3N1ZXIuaXNzdWUoYWNjZXNzVG9rZW5EYXRhLCBpc3N1ZWREZWxlZ2F0aW9uKTsKCiAgICAgICAgcmVzcG9uc2VEYXRhLmFjY2Vzc190b2tlbiA9IGlzc3VlZEFjY2Vzc1Rva2VuOwogICAgICAgIHJlc3BvbnNlRGF0YS50b2tlbl90eXBlID0gJ2JlYXJlcic7CiAgICAgICAgcmVzcG9uc2VEYXRhLmV4cGlyZXNfaW4gPSBzZWNvbmRzVW50aWwoYWNjZXNzVG9rZW5EYXRhLmV4cCk7CiAgICB9CgogICAgdmFyIGlkVG9rZW5EYXRhID0gY29udGV4dC5nZXREZWZhdWx0SWRUb2tlbkRhdGEoKTsKICAgIGlmIChpZFRva2VuRGF0YSkgewoKICAgICAgICB2YXIgaWRUb2tlbklzc3VlciA9IGNvbnRleHQuaWRUb2tlbklzc3VlcjsKICAgICAgICBpZFRva2VuRGF0YS5hdF9oYXNoID0gaWRUb2tlbklzc3Vlci5hdEhhc2goaXNzdWVkQWNjZXNzVG9rZW4pOwoKICAgICAgICByZXNwb25zZURhdGEuaWRfdG9rZW4gPSBpZFRva2VuSXNzdWVyLmlzc3VlKGlkVG9rZW5EYXRhKTsKICAgIH0KCiAgICByZXR1cm4gcmVzcG9uc2VEYXRhOwp9</script>
      </token-procedure>
      <token-procedure>
        <id>device-authorization</id>
        <flow>oauth-device-authorization</flow>
        <script>LyoKICogQ29weXJpZ2h0IChDKSAyMDE3IEN1cml0eSBBQi4gQWxsIHJpZ2h0cyByZXNlcnZlZC4KICoKICogVGhlIGNvbnRlbnRzIG9mIHRoaXMgZmlsZSBhcmUgdGhlIHByb3BlcnR5IG9mIEN1cml0eSBBQi4KICogWW91IG1heSBub3QgY29weSBvciB1c2UgdGhpcyBmaWxlLCBpbiBlaXRoZXIgc291cmNlIGNvZGUKICogb3IgZXhlY3V0YWJsZSBmb3JtLCBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRlcm1zCiAqIHNldCBieSBDdXJpdHkgQUIuCiAqCiAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uLCBwbGVhc2UgY29udGFjdCBDdXJpdHkgQUIuCiAqLwpmdW5jdGlvbiByZXN1bHQoY29udGV4dCkgewogICAgdmFyIGRldmljZUNvZGVEYXRhID0gY29udGV4dC5nZXREZWZhdWx0RGV2aWNlQ29kZURhdGEoKTsKICAgIGNvbnRleHQuZ2V0RGV2aWNlQ29kZU5vbmNlSXNzdWVyKCkuaXNzdWUoZGV2aWNlQ29kZURhdGEpOwoKICAgIHJldHVybiB7fTsKfQo=</script>
      </token-procedure>
      <token-procedure>
        <id>introspect-procedure</id>
        <flow>oauth-introspect</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciByZXNwb25zZURhdGEgPSB7CiAgICAgICAgYWN0aXZlOiBjb250ZXh0LnByZXNlbnRlZFRva2VuLmFjdGl2ZQogICAgfTsKCiAgICBpZiAoY29udGV4dC5wcmVzZW50ZWRUb2tlbi5hY3RpdmUpIHsKICAgICAgICBhcHBlbmRPYmplY3RUbyhjb250ZXh0LnByZXNlbnRlZFRva2VuLmRhdGEsIHJlc3BvbnNlRGF0YSk7CiAgICAgICAgcmVzcG9uc2VEYXRhLnRva2VuX3R5cGUgPSBjb250ZXh0LnByZXNlbnRlZFRva2VuLnR5cGU7CiAgICAgICAgcmVzcG9uc2VEYXRhLmNsaWVudF9pZCA9IGNvbnRleHQucHJlc2VudGVkVG9rZW4uZGVsZWdhdGlvbi5jbGllbnRJZDsKICAgICAgICByZXNwb25zZURhdGEuZXhwaXJlZF9zY29wZSA9IGNvbnRleHQucHJlc2VudGVkVG9rZW4uZXhwaXJlZFNjb3BlczsKICAgIH0KCiAgICByZXR1cm4gcmVzcG9uc2VEYXRhOwp9Cg==</script>
      </token-procedure>
      <token-procedure>
        <id>oauth-introspect-jwt</id>
        <flow>oauth-introspect</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciByZXNwb25zZURhdGEgPSB7CiAgICAgICAgYWN0aXZlOiBjb250ZXh0LnByZXNlbnRlZFRva2VuLmFjdGl2ZQogICAgfTsKCiAgICBpZiAoY29udGV4dC5wcmVzZW50ZWRUb2tlbi5hY3RpdmUpIHsKICAgICAgICBhcHBlbmRPYmplY3RUbyhjb250ZXh0LnByZXNlbnRlZFRva2VuLmRhdGEsIHJlc3BvbnNlRGF0YSk7CiAgICAgICAgcmVzcG9uc2VEYXRhLnRva2VuX3R5cGUgPSBjb250ZXh0LnByZXNlbnRlZFRva2VuLnR5cGU7CiAgICAgICAgcmVzcG9uc2VEYXRhLmNsaWVudF9pZCA9IGNvbnRleHQucHJlc2VudGVkVG9rZW4uZGVsZWdhdGlvbi5jbGllbnRJZDsKICAgICAgICByZXNwb25zZURhdGEuZXhwaXJlZF9zY29wZSA9IGNvbnRleHQucHJlc2VudGVkVG9rZW4uZXhwaXJlZFNjb3BlczsKICAgIH0KCiAgICByZXR1cm4gcmVzcG9uc2VEYXRhOwp9Cg==</script>
      </token-procedure>
      <token-procedure>
        <id>token-authorization-code</id>
        <flow>oauth-token-authorization-code</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBkZWxlZ2F0aW9uRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdERlbGVnYXRpb25EYXRhKCk7CiAgICB2YXIgaXNzdWVkRGVsZWdhdGlvbiA9IGNvbnRleHQuZGVsZWdhdGlvbklzc3Vlci5pc3N1ZShkZWxlZ2F0aW9uRGF0YSk7CgogICAgdmFyIGFjY2Vzc1Rva2VuRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdEFjY2Vzc1Rva2VuRGF0YSgpOwogICAgdmFyIGlzc3VlZEFjY2Vzc1Rva2VuID0gY29udGV4dC5hY2Nlc3NUb2tlbklzc3Vlci5pc3N1ZShhY2Nlc3NUb2tlbkRhdGEsIGlzc3VlZERlbGVnYXRpb24pOwoKICAgIHZhciByZWZyZXNoVG9rZW5EYXRhID0gY29udGV4dC5nZXREZWZhdWx0UmVmcmVzaFRva2VuRGF0YSgpOwogICAgdmFyIGlzc3VlZFJlZnJlc2hUb2tlbiA9IGNvbnRleHQucmVmcmVzaFRva2VuSXNzdWVyLmlzc3VlKHJlZnJlc2hUb2tlbkRhdGEsIGlzc3VlZERlbGVnYXRpb24pOwoKICAgIHZhciByZXNwb25zZURhdGEgPSB7CiAgICAgICAgYWNjZXNzX3Rva2VuOiBpc3N1ZWRBY2Nlc3NUb2tlbiwKICAgICAgICByZWZyZXNoX3Rva2VuOiBpc3N1ZWRSZWZyZXNoVG9rZW4sCiAgICAgICAgdG9rZW5fdHlwZTogJ2JlYXJlcicsCiAgICAgICAgZXhwaXJlc19pbjogc2Vjb25kc1VudGlsKGFjY2Vzc1Rva2VuRGF0YS5leHApCiAgICB9OwoKICAgIGlmIChjb250ZXh0LnNjb3BlTmFtZXMuY29udGFpbnMoJ29wZW5pZCcpKSB7CiAgICAgICAgdmFyIGlkVG9rZW5EYXRhID0gY29udGV4dC5nZXREZWZhdWx0SWRUb2tlbkRhdGEoKTsKCiAgICAgICAgdmFyIGlkVG9rZW5Jc3N1ZXIgPSBjb250ZXh0LmlkVG9rZW5Jc3N1ZXI7CiAgICAgICAgaWRUb2tlbkRhdGEuYXRfaGFzaCA9IGlkVG9rZW5Jc3N1ZXIuYXRIYXNoKGlzc3VlZEFjY2Vzc1Rva2VuKTsKCiAgICAgICAgcmVzcG9uc2VEYXRhLmlkX3Rva2VuID0gaWRUb2tlbklzc3Vlci5pc3N1ZShpZFRva2VuRGF0YSk7CiAgICB9CgogICAgcmV0dXJuIHJlc3BvbnNlRGF0YTsKfQ==</script>
      </token-procedure>
      <token-procedure>
        <id>token-client-credentials</id>
        <flow>oauth-token-client-credentials</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBkZWxlZ2F0aW9uRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdERlbGVnYXRpb25EYXRhKCk7CiAgICB2YXIgaXNzdWVkRGVsZWdhdGlvbiA9IGNvbnRleHQuZGVsZWdhdGlvbklzc3Vlci5pc3N1ZShkZWxlZ2F0aW9uRGF0YSk7CgogICAgdmFyIGFjY2Vzc1Rva2VuRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdEFjY2Vzc1Rva2VuRGF0YSgpOwogICAgCiAgICAvLyBEb24ndCBpc3N1ZSBhIHJlZiB0b2tlbiB1c2luZyB0aGUgZGVmYXVsdCB0b2tlbiBpc3N1ZXIuIEluc3RlYWQsIHVzZSB0aGUKICAgIC8vIEpXVCBpc3N1ZXIgdG8gZ2l2ZSBiYWNrLWVuZCBzZXJ2ZXIgY2xpZXRucyBhIEpXVCBpbW1lZGlhdGx5LgogICAgdmFyIGlzc3VlZEFjY2Vzc1Rva2VuID0gY29udGV4dC5nZXRBY2Nlc3NUb2tlbklzc3VlcigKICAgICAgICAgICAgImp3dEFjY2Vzc1Rva2VuSXNzdWVyIikuaXNzdWUoYWNjZXNzVG9rZW5EYXRhLCBpc3N1ZWREZWxlZ2F0aW9uKTsKCiAgICByZXR1cm4gewogICAgICAgIHNjb3BlOiBhY2Nlc3NUb2tlbkRhdGEuc2NvcGUsCiAgICAgICAgYWNjZXNzX3Rva2VuOiBpc3N1ZWRBY2Nlc3NUb2tlbiwKICAgICAgICB0b2tlbl90eXBlOiAnYmVhcmVyJywKICAgICAgICBleHBpcmVzX2luOiBzZWNvbmRzVW50aWwoYWNjZXNzVG9rZW5EYXRhLmV4cCkKICAgIH07Cn0=</script>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBkZWxlZ2F0aW9uRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdERlbGVnYXRpb25EYXRhKCk7CiAgICB2YXIgaXNzdWVkRGVsZWdhdGlvbiA9IGNvbnRleHQuZGVsZWdhdGlvbklzc3Vlci5pc3N1ZShkZWxlZ2F0aW9uRGF0YSk7CgogICAgdmFyIGFjY2Vzc1Rva2VuRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdEFjY2Vzc1Rva2VuRGF0YSgpOwogICAgdmFyIGlzc3VlZEFjY2Vzc1Rva2VuID0gY29udGV4dC5hY2Nlc3NUb2tlbklzc3Vlci5pc3N1ZShhY2Nlc3NUb2tlbkRhdGEsIGlzc3VlZERlbGVnYXRpb24pOwoKICAgIHJldHVybiB7CiAgICAgICAgc2NvcGU6IGFjY2Vzc1Rva2VuRGF0YS5zY29wZSwKICAgICAgICBhY2Nlc3NfdG9rZW46IGlzc3VlZEFjY2Vzc1Rva2VuLAogICAgICAgIHRva2VuX3R5cGU6ICdiZWFyZXInLAogICAgICAgIGV4cGlyZXNfaW46IHNlY29uZHNVbnRpbChhY2Nlc3NUb2tlbkRhdGEuZXhwKQogICAgfTsKfQ==</script>
      </token-procedure>
      <token-procedure>
        <id>token-device-code</id>
        <flow>oauth-token-device-code</flow>
        <script>LyoKICogQ29weXJpZ2h0IChDKSAyMDE3IEN1cml0eSBBQi4gQWxsIHJpZ2h0cyByZXNlcnZlZC4KICoKICogVGhlIGNvbnRlbnRzIG9mIHRoaXMgZmlsZSBhcmUgdGhlIHByb3BlcnR5IG9mIEN1cml0eSBBQi4KICogWW91IG1heSBub3QgY29weSBvciB1c2UgdGhpcyBmaWxlLCBpbiBlaXRoZXIgc291cmNlIGNvZGUKICogb3IgZXhlY3V0YWJsZSBmb3JtLCBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRlcm1zCiAqIHNldCBieSBDdXJpdHkgQUIuCiAqCiAqIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uLCBwbGVhc2UgY29udGFjdCBDdXJpdHkgQUIuCiAqLwpmdW5jdGlvbiByZXN1bHQoY29udGV4dCkgewogICAgdmFyIGRlbGVnYXRpb25EYXRhID0gY29udGV4dC5nZXREZWZhdWx0RGVsZWdhdGlvbkRhdGEoKTsKICAgIHZhciBpc3N1ZWREZWxlZ2F0aW9uID0gY29udGV4dC5kZWxlZ2F0aW9uSXNzdWVyLmlzc3VlKGRlbGVnYXRpb25EYXRhKTsKCiAgICB2YXIgYWNjZXNzVG9rZW5EYXRhID0gY29udGV4dC5nZXREZWZhdWx0QWNjZXNzVG9rZW5EYXRhKCk7CiAgICB2YXIgaXNzdWVkQWNjZXNzVG9rZW4gPSBjb250ZXh0LmFjY2Vzc1Rva2VuSXNzdWVyLmlzc3VlKGFjY2Vzc1Rva2VuRGF0YSwgaXNzdWVkRGVsZWdhdGlvbik7CgogICAgdmFyIHJlZnJlc2hUb2tlbkRhdGEgPSBjb250ZXh0LmdldERlZmF1bHRSZWZyZXNoVG9rZW5EYXRhKCk7CiAgICB2YXIgaXNzdWVkUmVmcmVzaFRva2VuID0gY29udGV4dC5yZWZyZXNoVG9rZW5Jc3N1ZXIuaXNzdWUocmVmcmVzaFRva2VuRGF0YSwgaXNzdWVkRGVsZWdhdGlvbik7CgogICAgdmFyIHJlc3BvbnNlRGF0YSA9IHsKICAgICAgICBhY2Nlc3NfdG9rZW46IGlzc3VlZEFjY2Vzc1Rva2VuLAogICAgICAgIHJlZnJlc2hfdG9rZW46IGlzc3VlZFJlZnJlc2hUb2tlbiwKICAgICAgICB0b2tlbl90eXBlOiAnYmVhcmVyJywKICAgICAgICBleHBpcmVzX2luOiBzZWNvbmRzVW50aWwoYWNjZXNzVG9rZW5EYXRhLmV4cCkKICAgIH07CgogICAgaWYgKGNvbnRleHQuc2NvcGVOYW1lcy5jb250YWlucygnb3BlbmlkJykpIHsKICAgICAgICB2YXIgaWRUb2tlbkRhdGEgPSBjb250ZXh0LmdldERlZmF1bHRJZFRva2VuRGF0YSgpOwoKICAgICAgICB2YXIgaWRUb2tlbklzc3VlciA9IGNvbnRleHQuaWRUb2tlbklzc3VlcjsKICAgICAgICBpZFRva2VuRGF0YS5hdF9oYXNoID0gaWRUb2tlbklzc3Vlci5hdEhhc2goaXNzdWVkQWNjZXNzVG9rZW4pOwoKICAgICAgICByZXNwb25zZURhdGEuaWRfdG9rZW4gPSBpZFRva2VuSXNzdWVyLmlzc3VlKGlkVG9rZW5EYXRhKTsKICAgIH0KCiAgICByZXR1cm4gcmVzcG9uc2VEYXRhOwp9Cg==</script>
      </token-procedure>
      <token-procedure>
        <id>token-refresh</id>
        <flow>oauth-token-refresh</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBhY2Nlc3NUb2tlbkRhdGEgPSBjb250ZXh0LmdldERlZmF1bHRBY2Nlc3NUb2tlbkRhdGEoKTsKICAgIHZhciBpc3N1ZWRBY2Nlc3NUb2tlbiA9IGNvbnRleHQuYWNjZXNzVG9rZW5Jc3N1ZXIuaXNzdWUoYWNjZXNzVG9rZW5EYXRhLCBjb250ZXh0LmRlbGVnYXRpb24pOwoKICAgIHZhciByZWZyZXNoVG9rZW4gPSBjb250ZXh0LnByZXNlbnRlZFRva2VuLnZhbHVlOwoKICAgIGlmIChyZWZyZXNoVG9rZW4gPT09IG51bGwpIHsKICAgICAgICB2YXIgcmVmcmVzaFRva2VuRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdFJlZnJlc2hUb2tlbkRhdGEoKTsKICAgICAgICByZWZyZXNoVG9rZW4gPSBjb250ZXh0LnJlZnJlc2hUb2tlbklzc3Vlci5pc3N1ZShyZWZyZXNoVG9rZW5EYXRhLCBjb250ZXh0LmRlbGVnYXRpb24pOwogICAgfQoKICAgIHJldHVybiB7CiAgICAgICAgc2NvcGU6IGFjY2Vzc1Rva2VuRGF0YS5zY29wZSwKICAgICAgICBhY2Nlc3NfdG9rZW46IGlzc3VlZEFjY2Vzc1Rva2VuLAogICAgICAgIHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbiwKICAgICAgICB0b2tlbl90eXBlOiAnYmVhcmVyJywKICAgICAgICBleHBpcmVzX2luOiBzZWNvbmRzVW50aWwoYWNjZXNzVG9rZW5EYXRhLmV4cCkKICAgIH07Cn0=</script>
      </token-procedure>
      <token-procedure>
        <id>token-token-exchange</id>
        <flow>oauth-token-token-exchange</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBhY2Nlc3NUb2tlbkRhdGEgPSBjb250ZXh0LmdldERlZmF1bHRBY2Nlc3NUb2tlbkRhdGEoKTsKICAgIHZhciBpc3N1ZWRBY2Nlc3NUb2tlbiA9IGNvbnRleHQuYWNjZXNzVG9rZW5Jc3N1ZXIuaXNzdWUoYWNjZXNzVG9rZW5EYXRhLCBjb250ZXh0LmRlbGVnYXRpb24pOwoKICAgIHJldHVybiB7CiAgICAgICAgc2NvcGU6IGFjY2Vzc1Rva2VuRGF0YS5zY29wZSwKICAgICAgICBhY2Nlc3NfdG9rZW46IGlzc3VlZEFjY2Vzc1Rva2VuLAogICAgICAgIHRva2VuX3R5cGU6ICdiZWFyZXInLAogICAgICAgIGV4cGlyZXNfaW46IHNlY29uZHNVbnRpbChhY2Nlc3NUb2tlbkRhdGEuZXhwKQogICAgfTsKfQ==</script>
      </token-procedure>
      <token-procedure>
        <id>userinfo-procedure</id>
        <flow>openid-userinfo</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciByZXNwb25zZURhdGEgPSBjb250ZXh0LmdldERlZmF1bHRSZXNwb25zZURhdGEoKTsKCiAgICBpZiAoY29udGV4dC5hY2NvdW50QXR0cmlidXRlc1snbmFtZSddICYmIGNvbnRleHQuYWNjb3VudEF0dHJpYnV0ZXNbJ25hbWUnXVsnZm9ybWF0dGVkJ10pIHsKICAgICAgICByZXNwb25zZURhdGEubmFtZSA9IGNvbnRleHQuYWNjb3VudEF0dHJpYnV0ZXNbJ25hbWUnXVsnZm9ybWF0dGVkJ107CiAgICB9CgogICAgdmFyIHByZXNlbnRlZFRva2VuRGF0YSA9IGNvbnRleHQucHJlc2VudGVkVG9rZW4uZGF0YTsKCiAgICByZXNwb25zZURhdGEuc2NvcGUgPSBwcmVzZW50ZWRUb2tlbkRhdGEuc2NvcGU7CiAgICByZXNwb25zZURhdGEuY2xpZW50X2lkID0gY29udGV4dC5wcmVzZW50ZWRUb2tlbi5kZWxlZ2F0aW9uLmNsaWVudElkOwogICAgcmVzcG9uc2VEYXRhLnByZWZlcnJlZF91c2VybmFtZSA9IGNvbnRleHQuYWNjb3VudEF0dHJpYnV0ZXMudXNlck5hbWU7CgogICAgcmV0dXJuIHJlc3BvbnNlRGF0YTsKfQoK</script>
      </token-procedure>
      <token-procedure>
        <id>introspect-procedure-application-jwt</id>
        <flow>oauth-introspect-application-jwt</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciByZXNwb25zZURhdGEgPSB7fTsKICAgIHZhciBkZWZhdWx0QXRKd3RJc3N1ZXIgPSBjb250ZXh0LmdldERlZmF1bHRBY2Nlc3NUb2tlbkp3dElzc3VlcigpOwoKICAgIGlmIChkZWZhdWx0QXRKd3RJc3N1ZXIgJiYgY29udGV4dC5wcmVzZW50ZWRUb2tlbi5hY3RpdmUgJiYgY29udGV4dC5kZWxlZ2F0aW9uKSB7CiAgICAgICAgcmVzcG9uc2VEYXRhLmp3dCA9IGRlZmF1bHRBdEp3dElzc3Vlci5pc3N1ZShjb250ZXh0LnByZXNlbnRlZFRva2VuLmRhdGEsIGNvbnRleHQuZGVsZWdhdGlvbik7CiAgICAgICAgcmVzcG9uc2VEYXRhLmFjdGl2ZSA9IHRydWU7CiAgICB9CgogICAgcmV0dXJuIHJlc3BvbnNlRGF0YTsKfQ==</script>
      </token-procedure>
      <token-procedure>
        <id>token-resource-owner-password-credentials</id>
        <flow>oauth-token-resource-owner-password-credentials</flow>
        <script>ZnVuY3Rpb24gcmVzdWx0KGNvbnRleHQpIHsKICAgIHZhciBkZWxlZ2F0aW9uRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdERlbGVnYXRpb25EYXRhKCk7CiAgICB2YXIgaXNzdWVkRGVsZWdhdGlvbiA9IGNvbnRleHQuZGVsZWdhdGlvbklzc3Vlci5pc3N1ZShkZWxlZ2F0aW9uRGF0YSk7CgogICAgdmFyIGFjY2Vzc1Rva2VuRGF0YSA9IGNvbnRleHQuZ2V0RGVmYXVsdEFjY2Vzc1Rva2VuRGF0YSgpOwogICAgdmFyIGlzc3VlZEFjY2Vzc1Rva2VuID0gY29udGV4dC5hY2Nlc3NUb2tlbklzc3Vlci5pc3N1ZShhY2Nlc3NUb2tlbkRhdGEsIGlzc3VlZERlbGVnYXRpb24pOwoKICAgIHJldHVybiB7CiAgICAgICAgc2NvcGU6IGFjY2Vzc1Rva2VuRGF0YS5zY29wZSwKICAgICAgICBhY2Nlc3NfdG9rZW46IGlzc3VlZEFjY2Vzc1Rva2VuLAogICAgICAgIHRva2VuX3R5cGU6ICdiZWFyZXInLAogICAgICAgIGV4cGlyZXNfaW46IHNlY29uZHNVbnRpbChhY2Nlc3NUb2tlbkRhdGEuZXhwKQogICAgfTsKfQ==</script>
      </token-procedure>
      <validation-procedure>
        <id>account-registration-validator</id>
        <script>ZnVuY3Rpb24gcmVzdWx0KHZhbGlkYXRpb25Db250ZXh0KSB7CiAgICB2YXIgZXJyb3JzID0ge307CgogICAgdmFyIHBhc3N3b3JkMSA9IHZhbGlkYXRpb25Db250ZXh0LnJlcXVlc3QuZ2V0Rm9ybVBhcmFtZXRlcigicGFzc3dvcmQiKTsKICAgIHZhciBwYXNzd29yZDIgPSB2YWxpZGF0aW9uQ29udGV4dC5yZXF1ZXN0LmdldEZvcm1QYXJhbWV0ZXIoInBhc3N3b3JkMiIpOwogICAgdmFyIGFjY2VwdFRlcm1zID0gdmFsaWRhdGlvbkNvbnRleHQucmVxdWVzdC5nZXRGb3JtUGFyYW1ldGVyKCJhZ3JlZVRvVGVybXMiKTsKCiAgICAvLyBwYXNzd29yZHMgc2hvdWxkIGJlIHRoZSBzYW1lCiAgICBpZiAocGFzc3dvcmQxICE9PSBwYXNzd29yZDIpIHsKICAgICAgICBlcnJvcnMucGFzc3dvcmQyID0gImVycm9yLnZhbGlkYXRpb24ucGFzc3dvcmQubWlzbWF0Y2giOwogICAgfQoKICAgIGlmIChhY2NlcHRUZXJtcyAhPT0gJ29uJykgewogICAgICAgIGVycm9ycy50ZXJtcyA9ICJlcnJvci52YWxpZGF0aW9uLnRlcm1zIjsKICAgIH0KCiAgICByZXR1cm4gZXJyb3JzOwp9</script>
        <type>request</type>
      </validation-procedure>
      <validation-procedure>
        <id>forgot-password-validator</id>
        <script>ZnVuY3Rpb24gcmVzdWx0KHZhbGlkYXRpb25Db250ZXh0KSB7CiAgICB2YXIgZXJyb3JzID0ge307CgogICAgdmFyIHVzZXJuYW1lID0gdmFsaWRhdGlvbkNvbnRleHQucmVxdWVzdC5nZXRGb3JtUGFyYW1ldGVyKCJ1c2VyTmFtZSIpOwogICAgdmFyIGVtYWlsID0gdmFsaWRhdGlvbkNvbnRleHQucmVxdWVzdC5nZXRGb3JtUGFyYW1ldGVyKCJwcmltYXJ5RW1haWwiKTsKCiAgICAvLyBvYmplY3Qgc2hvdWxkIGhhdmUgb25lIG9mIHVzZXJuYW1lIG9yIGVtYWlsCiAgICBpZiAoISh1c2VybmFtZSB8fCBlbWFpbCkpIHsKICAgICAgICBlcnJvcnMudXNlck5hbWUgPSAiZXJyb3IuZW1haWwub3IuYWNjb3VudElkLnJlcXVpcmVkIjsKICAgIH0KCiAgICByZXR1cm4gZXJyb3JzOwp9Cg==</script>
        <type>request</type>
      </validation-procedure>
      <validation-procedure>
        <id>phonenumber-validator</id>
        <script>ZnVuY3Rpb24gcmVzdWx0KHZhbGlkYXRpb25Db250ZXh0KSB7CiAgICB2YXIgZXJyb3JzID0ge307CiAgICB2YXIgcGhvbmVSZWdleCA9IC9eXCtcZHsyfVxkKyQvOwoKICAgIHZhciBjb3VudHJ5Q29kZSA9IHZhbGlkYXRpb25Db250ZXh0LnJlcXVlc3QuZ2V0Rm9ybVBhcmFtZXRlcigiY291bnRyeUNvZGUiKTsKICAgIHZhciBwaG9uZU51bWJlciA9IHZhbGlkYXRpb25Db250ZXh0LnJlcXVlc3QuZ2V0Rm9ybVBhcmFtZXRlcigicHJpbWFyeVBob25lTnVtYmVyIik7CgogICAgdmFyIGZ1bGxOdW1iZXI7CgogICAgaWYgKHBob25lTnVtYmVyICYmIHBob25lTnVtYmVyWzBdID09PSAiKyIpIHsKICAgICAgICBmdWxsTnVtYmVyID0gcGhvbmVOdW1iZXI7CiAgICB9IGVsc2UgewogICAgICAgIGZ1bGxOdW1iZXIgPSAiKyIgKyBjb3VudHJ5Q29kZSArIHBob25lTnVtYmVyOwogICAgfQoKICAgIGNvbnNvbGUubG9nKCJWYWxpZGF0aW5nIHBob25lTnVtYmVyOiAiICsgZnVsbE51bWJlcik7CgogICAgdmFyIG1hdGNoZXMgPSBwaG9uZVJlZ2V4LmV4ZWMoZnVsbE51bWJlcik7CgogICAgaWYgKCFtYXRjaGVzKSB7CiAgICAgICAgZXJyb3JzLnBob25lbnVtYmVyID0gImVycm9yLnZhbGlkYXRpb24uaW52YWxpZC5waG9uZW51bWJlciI7CiAgICB9CgogICAgcmV0dXJuIGVycm9yczsKfQo=</script>
        <type>request</type>
      </validation-procedure>
      <validation-procedure>
        <id>set-password-validator</id>
        <script>ZnVuY3Rpb24gcmVzdWx0KHZhbGlkYXRpb25Db250ZXh0KSB7CiAgICB2YXIgZXJyb3JzID0ge307CgogICAgdmFyIHBhc3N3b3JkMSA9IHZhbGlkYXRpb25Db250ZXh0LnJlcXVlc3QuZ2V0Rm9ybVBhcmFtZXRlcigicGFzc3dvcmQiKTsKICAgIHZhciBwYXNzd29yZDIgPSB2YWxpZGF0aW9uQ29udGV4dC5yZXF1ZXN0LmdldEZvcm1QYXJhbWV0ZXIoInBhc3N3b3JkMiIpOwoKICAgIC8vIHBhc3N3b3JkcyBzaG91bGQgYmUgdGhlIHNhbWUKICAgIGlmIChwYXNzd29yZDEgIT09IHBhc3N3b3JkMikgewogICAgICAgIGVycm9ycy5wYXNzd29yZDIgPSAidmFsaWRhdGlvbi5lcnJvci5wYXNzd29yZC5taXNtYXRjaCI7CiAgICB9CgogICAgcmV0dXJuIGVycm9yczsKfQo=</script>
        <type>request</type>
      </validation-procedure>
      <transformation-procedure>
        <id>simple-transformer</id>
        <script>LyoqCiAqIFRoaXMgaXMgYW4gZXhhbXBsZSBwcm9jZWR1cmUgdGhhdCBwZXJmb3JtcyBubyB0cmFuc2Zvcm1hdGlvbgogKiBAcGFyYW0gdHJhbnNmb3JtYXRpb25Db250ZXh0CiAqIEByZXR1cm5zIHsqfQogKi8KZnVuY3Rpb24gcmVzdWx0KHRyYW5zZm9ybWF0aW9uQ29udGV4dCkgewogICAgdmFyIGF0dHJpYnV0ZXMgPSB0cmFuc2Zvcm1hdGlvbkNvbnRleHQuYXR0cmlidXRlTWFwOwogICAgLyoKICAgIEV4YW1wbGU6IFRvIGFkZCBAZXhhbXBsZS5jb20gdG8gZWFjaCB1c2VybmFtZSwgZG86CiAgICBhdHRyaWJ1dGVzLnN1YmplY3QgPSBhdHRyaWJ1dGVzLnN1YmplY3QgKyAnQGV4YW1wbGUuY29tJzsKICAgICovCgogICAgLyoKICAgIEV4YW1wbGU6IFRvIGFkZCBleHRyYSBhdHRyaWJ1dGVzLCBsaWtlIGRldmljZSBpZCdzOgogICAgYXR0cmlidXRlcy5kZXZpY2VJZHMgPSBbMSwgMiwgM107CiAgICAqLwogICAgcmV0dXJuIGF0dHJpYnV0ZXM7Cn0K</script>
      </transformation-procedure>
      <filter-procedure>
        <id>authenticator-filter</id>
        <script>LyoqCiAqIEEgZmlsdGVyIHByb2NlZHVyZSBvZiAiYXV0aGVudGljYXRvciIgdHlwZSBjYW4gYmUgdXNlZCB0byBmaWx0ZXIgb3V0IGF1dGhlbnRpY2F0b3JzLgogKgogKiBAcGFyYW0gY29udGV4dCBvZiB0eXBlIHNlLmN1cml0eS5pZGVudGl0eXNlcnZlci5wcm9jZWR1cmVzLmZpbHRlci5BdXRoZW50aWNhdG9yRmlsdGVyUHJvY2VkdXJlQ29udGV4dC4KICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgdG8ga2VlcCB0aGUgY3VycmVudCBhdXRoZW50aWNhdG9yLCBmYWxzZSB0byByZW1vdmUgaXQuCiAqLwpmdW5jdGlvbiByZXN1bHQoY29udGV4dCkgewogICAgLyoKICAgICBUbyByZW1vdmUgYW4gYXV0aGVudGljYXRvciB3aXRoIGEgY2VydGFpbiBJRDoKCiAgICAgdmFyIGJhbm5lZEF1dGhlbnRpY2F0b3IgPSAnc21zJzsKICAgICByZXR1cm4gY29udGV4dC5hdXRoZW50aWNhdG9yLmlkICE9IGJhbm5lZEF1dGhlbnRpY2F0b3I7CgogICAgIFRoZSBIVFRQIFJlcXVlc3QgY2FuIGJlIGluc3BlY3RlZCBhcyBpbiB0aGlzIGV4YW1wbGU6CgogICAgIHZhciB1c2VyQWdlbnQgPSBjb250ZXh0LnJlcXVlc3QuZ2V0SGVhZGVyKCdVc2VyLUFnZW50Jykub3JFbHNlKCIiKTsKICAgICBpZiAodXNlckFnZW50Lm1hdGNoKCJDcmlPUyIpKSB7CiAgICAgLy8gYWxsb3cgb25seSBhIHBhcnRpY3VsYXIgYXV0aGVudGljYXRvcgogICAgIHJldHVybiBjb250ZXh0LmF1dGhlbnRpY2F0b3IuaWQgPT09ICdodG1sLXNxbCc7CiAgICAgfQogICAgIC8vIGxldCBhbGwgdGhyb3VnaAogICAgIHJldHVybiB0cnVlOwogICAgICovCgogICAgcmV0dXJuIHRydWU7Cn0=</script>
        <type>authenticator</type>
      </filter-procedure>
```

```xml
  <nacm xmlns="urn:ietf:params:xml:ns:yang:ietf-netconf-acm">
    <write-default>permit</write-default>
    <groups>
      <group>
        <name>admin</name>
        <user-name>admin</user-name>
      </group>
    </groups>
    <rule-list>
      <name>admin</name>
      <group>admin</group>
      <rule>
        <name>any-access</name>
        <action>permit</action>
      </rule>
    </rule-list>
    <rule-list>
      <name>any-group</name>
      <group>*</group>
      <rule>
        <name>tailf-aaa-authentication</name>
        <module-name>tailf-aaa</module-name>
        <path>/aaa/authentication/users/user[name='$USER']</path>
        <access-operations>read update</access-operations>
        <action>permit</action>
      </rule>
      <rule>
        <name>tailf-aaa-user</name>
        <module-name>tailf-aaa</module-name>
        <path>/user[name='$USER']</path>
        <access-operations>create read update delete</access-operations>
        <action>permit</action>
      </rule>
      <rule>
        <name>tailf-webui-user</name>
        <module-name>tailf-webui</module-name>
        <path>/webui/data-stores/user-profile[username='$USER']</path>
        <access-operations>create read update delete</access-operations>
        <action>permit</action>
      </rule>
    </rule-list>
  </nacm>
  <aaa xmlns="http://tail-f.com/ns/aaa/1.1">
    <authentication>
      <users>
        <user>
          <name>admin</name>
          <uid>9000</uid>
          <gid>20</gid>
          <password>$1$DltmizRh$EwjAvVdEraKm85VKTaGHJ0</password>
          <ssh_keydir></ssh_keydir>
          <homedir>/Users/atifsaddique/Documents/programs/curity/curity-3.0.0/idsvr/home/admin</homedir>
        </user>
      </users>
    </authentication>
    <ios>
      <level>
        <nr>0</nr>
        <prompt>\h> </prompt>
      </level>
      <level>
        <nr>15</nr>
        <prompt>\h# </prompt>
      </level>
      <privilege>
        <mode>exec</mode>
        <level>
          <nr>0</nr>
          <command>
            <name>action</name>
          </command>
          <command>
            <name>autowizard</name>
          </command>
          <command>
            <name>enable</name>
          </command>
          <command>
            <name>exit</name>
          </command>
          <command>
            <name>help</name>
          </command>
          <command>
            <name>startup</name>
          </command>
        </level>
        <level>
          <nr>15</nr>
          <command>
            <name>configure</name>
          </command>
        </level>
      </privilege>
    </ios>
  </aaa>
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
