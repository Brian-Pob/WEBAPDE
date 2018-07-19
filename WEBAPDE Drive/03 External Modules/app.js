//Node has many modules built it. A list of these modules can be found here:
//    https://nodejs.org/docs/latest/api/

//File System are modules used for File system manipulation. 
const filesys = require('fs');
const dir = filesys.readdirSync('./');
console.log(dir);

//When using node, node that node uses an asychnronus process normally.
//In the example above, the system forces a synchronized process which forces
//the rest of nodes processes to halt. This is because node has an internal
//architecture that is asynchronus by default.