var http = require('http');
var url = require('url');

// Take the listening port as argument
var port = (process.argv.length > 2 ? process.argv[2] : 8100);

var handleApiRequest = function (request, response) {

    console.log("Serving API");

    var responseHeaders = {
        'Content-Type': 'application/json',
    };

    var origin = request.headers["origin"];

    if (request.method === 'OPTIONS') {
        console.log("Accepting probable preflight request");

        if (origin) {
            responseHeaders['Access-Control-Allow-Origin'] = origin;
            responseHeaders['Access-Control-Allow-Methods'] = "GET, HEAD, OPTIONS";
            responseHeaders['Access-Control-Allow-Headers'] = 'Authorization, WWW-Authenticate, Content-Type';
            responseHeaders["Access-Control-Allow-Credentials"] = "true";
        }

        responseHeaders["Allow"] = "GET, HEAD, OPTIONS";

        response.writeHead(200, responseHeaders);
        response.end();
        return;
    }
    else if (origin) {
        responseHeaders["Access-Control-Allow-Origin"] = origin;
        responseHeaders["Access-Control-Allow-Credentials"] = "true";
    }


    var authorizeHeader = request.headers['authorization'];
    response.writeHead(200, responseHeaders);

    if (authorizeHeader !== undefined) {
        var token = authorizeHeader.substring('Bearer '.length);
        response.end(JSON.stringify({"data": "API accessed with token " + token}), 'utf-8');
    } else {
        response.writeHead(401, responseHeaders);
        response.end("No token on request");
    }

    if (!response.finished) {
        console.log("handleApiRequest: Ending response");
    }
};

http.createServer(function (request, response) {

    console.log('request starting...');

    var pathname = url.parse(request.url, true).pathname;

    if (pathname === '/api') {
        handleApiRequest(request, response);
    } else {
        response.statusCode = 400;
        response.end("Request not allowed");
        return;
    }

}).listen(port);

console.log('Server running at http://127.0.0.1:%d/', port);