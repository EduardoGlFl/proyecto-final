var fileInputCSV = document.getElementById("fileInputCSV");

fileInputCSV.addEventListener("change", function (e) {
  var convertir = false;
  comprueba_extension(this.form, this.form.archivoupload.value);

  function comprueba_extension(formulario, archivo) {
    extensiones_permitidas = new Array(".csv");
    mierror = "";
    if (!archivo) {
      mierror = "File not selected";
    } else {
      extension = archivo.substring(archivo.lastIndexOf(".")).toLowerCase();
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
        alert("Files upload correctly, convert?");
        convertir = true;
        return 0;
      }
    }
    alert(mierror);
    return 0;
  }

  if (convertir) {
    var file = e.target.files[0];
    var csvParser = new SimpleExcel.Parser.CSV();
    csvParser.setDelimiter(",");
    csvParser.loadFile(file, function () {
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
