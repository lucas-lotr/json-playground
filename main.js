const file = 'evento-xp-export.json';

//import * as data from './json/evento-xp-export.json';
// const fs = require('fs');
// const json_data = require('../json/evento-xp-export.json    ');

// fs.readFile(json_data, 'utf-8', function(err,data){
//     data=JSON.parse(data);
// });

function loadJSON(callback){

    var obj = new XMLHttpRequest();

    obj.overrideMimeType("application/json");
    obj.open('GET', file, false)
    obj.onreadystatechange = function() {
        callback(obj.responseText);
    };
    obj.send(null);

}

function go(){

    loadJSON(function(response){
        var data = JSON.parse(response);
        var leads = data.leads;
        var qtd = data.meta.qtd;
        //console.log(leads[1].email);

        var csv = `nome,email,empresa,telefone,fonte\n`
    

        for (i=1;i<=qtd;i++){

            let text = document.createTextNode(`${leads[i].nome},${leads[i].email},${leads[i].empresa},${leads[i].telefone},${leads[i].source}`);

            csv = csv + `${leads[i].nome},${leads[i].email},${leads[i].empresa},${leads[i].telefone},${leads[i].source}\n`

            let paragrafo = document.createElement('p');
            paragrafo.appendChild(text);
            document.body.appendChild(paragrafo)

            
        }


        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "LeadsExport.csv";  //Name the file here
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    });
    

    


}