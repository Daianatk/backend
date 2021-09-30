var fs = require("fs")
var http = require("http")

//Primera parte
var numeros = ""
for (var i=1; i<=50; i++){
  if (i%2 == 0){
    if(i!= 50){
      numeros = numeros + i + ";"
    } else {
      numeros = numeros + i
    }
    //numeros = numeros + i + "\n"
  }
}
 fs.writeFile("pares.csv", numeros, function(err){
   if (err){
     return console.log(err)
   }
   console.log("Pares salvados")
 })

 fs.readFile("pares.csv", function (err, resp) {
   if (err){
     return console.log(err)
   }
   var pares = resp.toString()
   var paresArray = pares.split(";")
   var paresPor2 = ""
   for (i of paresArray){
     paresPor2 = paresPor2 + i * 2 + ";"
   }
   fs.writeFile("pares_por_dos.csv", paresPor2, function(err){
     if(err){
       return console.log(err)
     }
     console.log("Pares por dos salvados")
   });
 });

 fs.readFile("pares.csv", function (err, resp) {
   if (err){
     return console.log(err)
   }
   http.createServer(function (req, res) {
     //res.write(resp.toString())
     var tabla = "<table><tr><td>Posicion</td><td>Valor</td></tr>"
     var numerosFinal = resp.toString().split(";")
     for (i in numerosFinal){
      tabla = tabla + "<tr><td>"+ i +"</td><td>"+ numerosFinal[i]+"</td>"
     }
     tabla = tabla + "</table>"
     res.write(tabla)
     res.end()
   }).listen(8000)
 });