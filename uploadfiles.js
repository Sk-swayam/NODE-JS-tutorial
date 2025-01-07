// The formidable module offers a convenient API to handle the file uploads.
//The Formidable module is a fast and streaming multipart parser, capable of automatically writing file uploads to the disk
var http = require('http');
var formidable = require('formidable');

var errors = formidable.formidableErrors;

const server = http.createServer(async (req, res) => {
   if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {
      // parse a file upload
      const form = new formidable.IncomingForm();
      let fields;
      let files;
      try {
         [fields, files] = await form.parse(req);
      } catch (err) {

         res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
         res.end(String(err));
         return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
      return;
   }

   // show a file upload form
   res.writeHead(200, { 'Content-Type': 'text/html' });
   res.end(`
      <h2>With Node.js <code>"http"</code> module</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
      </form>
   `);
});
server.listen(5000, () => {
   console.log('Server listening on http://localhost:5000/ ...');
});


//explanation of this code
/*

Dependencies
-http module:

The built-in Node.js module for creating HTTP servers.
-formidable module:

A library used to handle form submissions, especially file uploads.
It simplifies parsing of incoming form data.
-formidableErrors:

Access predefined errors from formidable. Though defined in the code, errors is not used.
Code Breakdown
1. Server Creation

--const server = http.createServer(async (req, res) => {

-->http.createServer creates an HTTP server that listens for incoming requests
 and handles them using the provided callback function (async (req, res)).

 2. Route Handling
-File Upload Endpoint

--if (req.url === '/api/upload' && req.method.toLowerCase() === 'post') {

-->The server checks if the request is:
URL: /api/upload
Method: POST (used for file uploads).
If matched, the server processes the upload.

-Formidable Setup and Parsing

--const form = new formidable.IncomingForm();

-->IncomingForm:
This object manages file parsing and storage from incoming form data.

--let fields;
let files;
try {
   [fields, files] = await form.parse(req);
} catch (err) {
   res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
   res.end(String(err));
   return;
}

-->form.parse(req):
Parses the incoming request:
fields: Key-value pairs for non-file data (e.g., text inputs).
files: Information about uploaded files.
The method is asynchronous and wrapped in a try...catch block for error handling.
Error Handling:
If parsing fails, an error is sent to the client:
HTTP status: Derived from err.httpCode or defaults to 400.
Response body: Error message.

-Successful Response

--res.writeHead(200, { 'Content-Type': 'application/json' });
--res.end(JSON.stringify({ fields, files }, null, 2));

-->If parsing is successful:
Status Code: 200 OK.
Content-Type: application/json.
Body: JSON object with fields and files.

-Default Form Endpoint

--res.writeHead(200, { 'Content-Type': 'text/html' });
--res.end(`
   <h2>With Node.js <code>"http"</code> module</h2>
   <form action="/api/upload" enctype="multipart/form-data" method="post">
   <div>Text field title: <input type="text" name="title" /></div>
   <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
   <input type="submit" value="Upload" />
   </form>
`);

-->When a user accesses the root URL (/), the server responds with an HTML form:
action="/api/upload": Form data is sent to /api/upload for processing.
enctype="multipart/form-data": Specifies encoding for file uploads.
method="post": HTTP POST method is used.
Inputs:
title: Text field for additional data.
multipleFiles: File input allowing multiple file uploads.

3. Server Listening

--server.listen(5000, () => {
   console.log('Server listening on http://localhost:5000/ ...');
});

-->The server listens on port 5000.
Logs the URL (http://localhost:5000/) to the console.

