// import fs from 'fs';
// import path from 'path';
// const StorageFile=path.resolve('abc.json');

// fs.writeFileSync(StorageFile,JSON.stringify("hi my name is rajneesh"),'utf-8');
// const data= fs.readFileSync(StorageFile,'utf-8');
// console.log(typeof(data));
// const result = JSON.parse(data);
// console.log(typeof(result));

// const a = new Map();
// console.log(typeof(a))
// console.log(a);

// import express from 'express';

// const app = express();

// // const ipBlocker=(req,res,next)=>{
// //     // console.log(req.connection.remoteAddress);
// //     // console.log(req.url)
   
// //     next();
// // };
// // app.use(ipBlocker);
// app.get('/', (req, res) => {
//   res.send({
//     message:"hello world",
//     name:"rajneesh"
//   });
// });
// app.listen(5000, () => {
//   console.log(`http://localhost:5000`);
// });

// const data = fetch('http://localhost:5000/api/admin/attacks').then((res) => {
//     return res.json();
// }).then((data)=>{
//  console.log(data);
// }).catch((err)=>{
//   console.log(err.message);
// })
