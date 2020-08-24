
    var width = 20, height = 20
    function tableCreate(w, h){
        var body = document.body,
            tbl  = document.createElement('table');
        
        tbl.style.border = '1px solid black';
        tbl.setAttribute('cellspacing', '0');
        tbl.setAttribute('rowspacing', '0');

        for(var i = 0; i < h; i++){
            var tr = tbl.insertRow();
            tr.id = i
            for(var j = 0; j < w; j++){
                if(i == h && j == w){
                    break;
                } else {
                    var td = tr.insertCell();
                    td.classList.add('dead', 'cell');
                    td.id = id(i, j);
                }
            }
        }
        body.appendChild(tbl);
    }
    tableCreate(width,height)

    function toCoords(ID) {
        
        var coords = ID.split('-');
        return {
            x: Number(coords[0]),
            y: Number(coords[1])
        }
    }
    function toID(coords) {
        return coords.x+'-'+coords.y;
    }
    function id(x,y) {
        return x+'-'+y

    }
    function queryState(x,y) {
        var cell = document.getElementById(id(x,y));
        if (cell == null) {
            return false
        } else {
            return cell.classList.contains('live')
        }
    }
    function kill(elem) {$(elem).removeClass('live'); $(elem).addClass('dead');}
    function live(elem) {$(elem).removeClass('dead'); $(elem).addClass('live');}
    function togl(elem) {$(elem).toggleClass('live'); $(elem).toggleClass('dead');}

    $('.cell').click(function(){togl(this)})
    $('.cell').hover(function() {$('#coords').text(this.id.replace('-', ', '))})

    function getSurroundingCount(cellID) {
        var count = 0, debug = 0;
        var tcc = toCoords(cellID.toString());
        var xtop = (tcc.x+1), ytop = (tcc.y+1);
        for(var x = (tcc.x-1); x<=xtop; x++) {
            for(var y = (tcc.y-1); y<=ytop; y++) {
                if ((x != tcc.y) && (y != tcc.y)){
                if (queryState(x,y)==true){count++} else {}
                debug++
                }
            }
        }
        return count
    }


    function step() {
        var buffer = new Array(width).fill(new Array(height).fill(null));
        $('.cell').each(function() {
            var neighbors = getSurroundingCount(this.id);
            var live = (this.classList.contains('live')); 
            var tc = toCoords($(this).attr('id').toString());
            var result;
            console.log(`state of ${tc.x}, ${tc.y} is ${live}`);
            if (live==true) {
                
                if ((neighbors > 1) && (neighbors < 4)) {
                    result = true;
                    buffer[tc.x][tc.y] = result;
                    console.log(`buffered calculated state of ${tc.x}, ${tc.y} as ${result} with ${neighbors} neighbors`);
                    
                } else {result = false; console.log(`buffered calculated state of ${tc.x}, ${tc.y} as ${result} with ${neighbors} neighbors`); buffer[tc.x][tc.y] = result;}
                
            }
            if (live==false) {
                if (neighbors == 3) {
                    result = true
                    buffer[tc.x][tc.y] = result;
                    console.log(`buffered calculated state of ${tc.x}, ${tc.y} as ${result} with ${neighbors} neighbors`);
                } else {result = false; console.log(`buffered calculated state of ${tc.x}, ${tc.y} as ${result} with ${neighbors} neighbors`); buffer[tc.x][tc.y] = result;}
                
            }
            
            
            
        })
        console.log('logged result:');
            console.log(buffer);
        console.log('calculation done');
        for(var x = 0; x < buffer.length; x++) {
            let row = buffer[x];
            for(var y = 0; y < row.length; y++) {
                console.log(`ID is ${id(x,y)}`);
                var state = row[y], cell = $('#'+id(x,y))
                console.log('debuffered ['+x+', '+y+'] as '+state);
                if (state == true) {
                    console.log(`the result of ${x}, ${y} is 'live'`);
                    live(cell);
                } else {
                    console.log(`the result of ${x}, ${y} is 'dead'`);
                    kill(cell);
                }
            }
        }
        console.log('buffering done');
    }
