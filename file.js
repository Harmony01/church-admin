const fs = require('fs');
/*
fs.readFile('./api/file.txt', (err, data)=>{
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
})

*/
fs.writeFile('./api/auth/file.txt', 'hello world', ()=>{
    console.log('file written')
});