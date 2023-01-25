const express = require('express')
const path = require("path");
const app = express()

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('public', options))

const words = ['salad','importance','client','editor','county','speaker','affair','music','examination','housing','permission','mixture','software','success','bird','uncle','competition','supermarket','strategy','perception','internet','instance','problem','independence','version','paper','politics','collection','recommendation','stranger','setting','topic','preparation','pizza','property','marriage','indication','audience','hall','dad','series','depression','tennis','performance','owner','concept','resource','poetry','chocolate','failure','agency','bath','chest','homework','combination','analysis','injury','replacement','highway','engine','championship','communication','message','cheek','method','decision','temperature','independence','television','math','hair','assistant','year','player','explanation','series','selection','girlfriend','magazine','activity','difficulty','sir','tale','wood','employment','failure','warning','session','throat','editor','response','medicine','photo','winner','perception','wedding','product','population','argument','enthusiasm'];

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  if(req.params[0] === '/random')
  {
    res.json({
      multiple: Math.floor(Math.random() * 30) + 1,
      word: words[Math.floor(Math.random() * words.length)]
    })
    .end();
    return;
  }
  res.status(404).send('Not found');
})

module.exports = app
