    

    
        var size = 9;
        var RScolor = '4';
        var eraser = false;
        var color = "black"; 
        var key = false; 
        var selecteditem = 2
        var colors = 11
        document.getElementById("ps").addEventListener("change", pxsize, false);
        function pxsize(event) {
            size = event.target.value;
            document.getElementById("pxs").innerText = size;
            // Need to revamp for canvas
            $('.pixel').css('width',size)
            $('.pixel').css('height',size)
            $("#canvasbox").css('background-size', (size))
        }
        

        
        $('.radio-group .radio').click(function(){
            $(this).parent().find('.radio').removeClass('selected');
            $(this).addClass('selected');
            if ($(this).attr("val") == "CUSTOM") {
                var val = $(this).find(".picker").attr('value');
                console.log(val+" is the color");
            } else {
                var val = $(this).attr("val");
                console.log(val+" is the color");
            }
            console.log(val+" is the color");
            color = val
        });

        // download html stuff
        document.getElementById('dld').onclick = function(){
            var canva = document.getElementById('canvas');
            var data = canva.getImageData;
            var fn = prompt('filename')
            if (fn) {
            download(fn+'.html', data)
            } else {}
        };

        $('button').focus(function() {this.blur()})

        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
          }

        
    document.getElementById('file').addEventListener('change', readFile, false);

    function readFile (evt) {
        var files = evt.target.files;
        var file = files[0];           
        var reader = new FileReader();
        reader.onload = function(event) {
            console.log("Loaded: "+event.target.result);
            document.getElementById('tb').innerHTML = event.target.result;          
        }
        reader.readAsText(file)
    }

        function E_on() {
            RScolor = $('.selected').attr('id');
            selectItem('0')
            console.log("rsc = "+RScolor);
        }

        function E_of() {
            selectItem(RScolor)
        }

        function E_tg() {
            if (!eraser) {
                eraser = true;
                E_on();
            } else {E_of(); eraser = false}
        }

        function selectItem(selecteditem) {
            document.getElementsByClassName("selected")[0].classList.remove('selected');
                document.getElementById(selecteditem).classList.add('selected');
                if ($('#'+selecteditem).attr("val") == "CUSTOM") {
                    color = document.getElementById('customColor'+selecteditem).value;
                    console.log(color+" is the color");
                } else {
                    color = $('#'+selecteditem).attr("val");
                    console.log(color+" is the color");
                }
        }


        function addcolors() {
            var LIcolors = Array(prompt('list of colors'));
            for(var x; x < LIcolors.length; x++) {
                col = LIcolors[x];
                addcc(col)
            }
        }

        function myFunc(x) {
            x.style.backgroundColor = color
            if (color == 'transparent') {
                x.style.boxShadow = '';
            } else {
            if (shadow == 'black') {$(x).css("box-shadow", '3px 3px 10px black');}
            if (shadow == 'color') {$(x).css("box-shadow", '3px 3px 10px '+color);}
            }
        }
        
        function addcc(basecolor) {
            colors++;
            $('#colorSelect').append('<li id="'+colors+'" val="CUSTOM" class="radio" style="background-color: '+basecolor+'; color: white;"><input type="color" name="picker" id="customColor'+colors+'" value="'+basecolor+'" class="picker"></li>');
            var picker =  document.getElementById("customColor"+colors);
            picker.addEventListener("change", watchColorPicker, false);
        }

        

        function watchColorPicker(event) {
            color = event.target.value;
            $(event.target).parent().parent().find('.radio').removeClass('selected');
            $(event.target).parent().addClass('selected');
            $(event.target).find('li').css('background-color', 'color');
        }

        $(this).keydown((e) => {
            if (e.code == "ShiftLeft"){
                key = true;
            } else {
                key = false;
            }

        })
        $(this).mouseup((e) => {
            if (e.button == 0){
                key = false;
            }
        })
        $(this).mousedown((e) => {
            if (e.button == 0){
                key = true;
            } else {
                key = false;
            }

        })
        $(this).keyup((e) => {
            if (e.code == "ShiftLeft"){
                key = false;
            }
        })

        var border = false;
        $(this).keypress((e) => {
            if (e.code == "KeyQ"){
                if (!border) {
                    var elems = document.getElementsByClassName('pixel');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].style.borderWidth = "1px";
                    }
                    border = true;
                } else {
                    var elems = document.getElementsByClassName('pixel');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].style.borderWidth = "0px";
                    }
                    border = false;
                }
                
            }
            
            if (e.code == "KeyC"){
                if (confirm("Make a new drawing grid?")) {
                    newCanvas();
                }
                
            }
            if (e.code == "KeyE"){
                if (confirm("Erase?")) {
                    var elems = document.getElementsByClassName('pixel');
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].style.backgroundColor = "transparent";
                        elems[i].style.boxShadow = ''
                    
                    }
                }
            }

            if (e.code == "KeyS"){
                if (selecteditem < colors) {
                    selecteditem = document.getElementsByClassName("selected")[0].getAttribute("id")
                    selecteditem++
                    document.getElementsByClassName("selected")[0].classList.remove('selected');
                    document.getElementById(selecteditem).classList.add('selected');
                    if ($('#'+selecteditem).attr("val") == "CUSTOM") {
                        color = document.getElementById('customColor'+selecteditem).value;
                        console.log(color+" is the color");
                    } else {
                        color = $('#'+selecteditem).attr("val");
                        console.log(color+" is the color");
                    }
                    
                } else {
                    selecteditem = 0;
                    
                    document.getElementsByClassName("selected")[0].classList.remove('selected');
                    document.getElementById(selecteditem).classList.add('selected');
                    if ($('#'+selecteditem).attr("val") == "CUSTOM") {
                        color = document.getElementById('customColor'+selecteditem).value;
                        console.log(color+" is the color");
                    } else {
                        color = $('#'+selecteditem).attr("val");
                        console.log(color+" is the color");
                    }
                    
                }
            }
            if (e.code == "KeyW"){
                if (selecteditem > 0) {
                    selecteditem = document.getElementsByClassName("selected")[0].getAttribute("id")
                    selecteditem--
                    document.getElementsByClassName("selected")[0].classList.remove('selected');
                    document.getElementById(selecteditem).classList.add('selected');
                    
                    if ($('#'+selecteditem).attr("val") == "CUSTOM") {
                        color = document.getElementById('customColor'+selecteditem).value;
                        console.log(color+" is the color");
                    } else {
                        color = $('#'+selecteditem).attr("val");
                        console.log(color+" is the color");
                    }
                    
                } else {
                    selecteditem = colors;
                    
                    document.getElementsByClassName("selected")[0].classList.remove('selected');
                    document.getElementById(selecteditem).classList.add('selected');
                    if ($('#'+selecteditem).attr("val") == "CUSTOM") {
                        color = document.getElementById('customColor'+selecteditem).value;
                        console.log(color+" is the color");
                    } else {
                        color = $('#'+selecteditem).attr("val");
                        console.log(color+" is the color");
                    }
                    
                }
            }
            if (["KeyZ", "Equal"].includes(e.code)){
                size++;
                document.getElementById("pxs").innerText = size;
                $('.pixel').css('width',size);
                $('.pixel').css('height',size);
                $("#canvas").css('background-size', (size))
            }
            if (["KeyX", "Minus"].includes(e.code)){
                size--;
                if (size < 1) {
                    size = 1
                }
                
                document.getElementById("pxs").innerText = size;
                $('.pixel').css('width',size);
                $('.pixel').css('height',size);
                $("#canvas").css('background-size', (size))
            }
            if (e.code == "KeyD") {
                addcc("#bfbfbf");
            }
            if (e.code == "Space") {E_tg()}
        })

        function colorReplace(context, target, result) {
            // pull the entire image into an array of pixel data
            canvas = document.getElementById('canvas');
            var h = canvas.height, w = canvas.width;
            var imageData = context.getImageData(0, 0, w, h);

            // examine every pixel, 
            // change any old rgb to the new-rgb
            for (var i=0;i<imageData.data.length;i+=4)
            {
                // is this pixel the old rgb?
                if(imageData.data[i]==target.r &&
                    imageData.data[i+1]==target.g &&
                    imageData.data[i+2]==target.b
                ){
                    // change to your new rgb
                    imageData.data[i]=result.r;
                    imageData.data[i+1]=result.g;
                    imageData.data[i+2]=result.b;
                }
            }
            // put the altered data back on the canvas  
            context.putImageData(imageData,0,0);
        }
        
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          }
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        function tableCreate(h, w){
            
            var div = document.createElement("div");
            div.classList.add("canvasbox", "fleft");
            div.id = "tb";
            var body = document.body,
                tbl  = document.createElement('canvas');
            tbl.setAttribute("class", "SIZED border");
            tbl.setAttribute("id", "canvas");
            tbl.setAttribute('width', w);
            tbl.setAttribute('height', h);
            div.appendChild(tbl);
            body.appendChild(div)

            
            return true;
            
        }

        function newCanvas() {
            var input = prompt("Canvas Size (width, height)").replace(" ", "").split(",");
            var valid = input.every(function(e) {return Boolean(Number(e))})
            if ((input.length == 2 && valid) && ((Number(input[0])+Number(input[1]))< 3000)) {
                document.getElementById("canvas").remove();
                if (tableCreate(Number(input[0]), Number(input[1]))) {
                    document.getElementById("tb")[0].remove();
                } else {
                    alert("Oops, something went wrong! code: E-1")
                }
            } else {
                alert("Too big of a canvas to generate, choose values less than 300, or maybe somthing else :p");
            }
        
        }
        tableCreate(50, 50)
   
        
