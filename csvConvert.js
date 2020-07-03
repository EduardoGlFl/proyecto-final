var fileInputCSV = document.getElementById("fileInputCSV");

// when local file loaded
fileInputCSV.addEventListener("change", function (e) {
  var convertir = false;
  comprueba_extension(this.form, this.form.archivoupload.value);
  //Comprueba si el archivo es .csv
  function comprueba_extension(formulario, archivo) {
    extensiones_permitidas = new Array(".csv");
    mierror = "";
    if (!archivo) {
      //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario
      mierror = "File not selected";
    } else {
      //recupero la extensión de este nombre de archivo
      extension = archivo.substring(archivo.lastIndexOf(".")).toLowerCase();
      //alert (extension);
      //compruebo si la extensión está entre las permitidas
      permitida = false;
      for (var i = 0; i < extensiones_permitidas.length; i++) {
        if (extensiones_permitidas[i] == extension) {
          permitida = true;
          break;
        }
      }
      if (!permitida) {
        mierror =
          "File not supported only " +
          extensiones_permitidas.join() +
          " extensions";
      } else {
        //Aceptado
        alert("Files upload correctly, convert?");
        convertir = true;
        return 0;
      }
    }
    //si estoy aqui es que no se ha podido submitir
    alert(mierror);
    return 0;
  }

  if (convertir) {
    // parse as CSV
    var file = e.target.files[0];
    var csvParser = new SimpleExcel.Parser.CSV();
    csvParser.setDelimiter(",");
    csvParser.loadFile(file, function () {
      // draw HTML table based on sheet data
      var sheet = csvParser.getSheet();
      var table = document.getElementById("result");
      table.innerHTML = "";
      sheet.forEach(function (el, i) {
        var row = document.createElement("tr");
        el.forEach(function (el, i) {
          var cell = document.createElement("td");
          cell.innerHTML = el.value;
          row.appendChild(cell);
        });
        table.appendChild(row);
      });
    });
  }
});
