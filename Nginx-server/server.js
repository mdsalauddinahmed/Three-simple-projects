const http = require("http");
const fs = require("fs");
const path = require("path");


const port = 3000;

const server= http.createServer((req,res)=>{
     const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
    console.log(filePath);
     const extname = String(path.extname(filePath)).toLowerCase()

        const mimeTypes = {
            '.html':'text/html',
            '.css':'text/css',
            '.js':'text/javascript',
            '.png':'image/png'
        }

  const contentType= mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath,(err,content)=>{
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("<h1>404 - File Not Found</h1>");
            } else {
                res.writeHead(500);
                res.end("Server Error");
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
         
    })

 
});






server.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
//     const filePath = path.join(__dirname, req.url === '/' ? "index.html" : req.url);
   
//      console.log(filePath);

//     const extname = String(path.extname(filePath)).toLowerCase();

//     const mimeTypes = {
//         '.html': 'text/html',
//         '.css': 'text/css',
//         '.js': 'text/javascript',
//         '.png': 'image/png'
//     };

//     const contentType = mimeTypes[extname] || 'application/octet-stream';

//     fs.readFile(filePath, (err, content) => {
        // if (err) {
        //     if (err.code === "ENOENT") {
        //         res.writeHead(404, { 'Content-Type': 'text/html' });
        //         res.end("<h1>404 - File Not Found</h1>");
        //     } else {
        //         res.writeHead(500);
        //         res.end("Server Error");
        //     }
        // } else {
        //     res.writeHead(200, { 'Content-Type': contentType });
        //     res.end(content);
        // }
//     });
// });
 
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
