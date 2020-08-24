function tableCreate(w, h){
    var body = document.body,
        tbl  = document.createElement('table');
    
    tbl.style.border = '1px solid black';
    tbl.setAttribute('cellspacing', '0');
    tbl.setAttribute('rowspacing', '0');

    for(var i = 0; i < h; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < w; j++){
            if(i == h && j == w){
                break;
            } else {
                var td = tr.insertCell();
                td.classList.add('dead');
            }
        }
    }
    body.appendChild(tbl);
}
tableCreate(40,40);

function toCoords(cellID) {
	var coords = cellId.split('-');
  this.x = coords[0];
  this.y = coords[1];
}

function getSurroundingCount(cellID) {
	var thisCell
}