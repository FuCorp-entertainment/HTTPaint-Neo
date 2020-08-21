    

    
        var size = 9;
        var shadow = null
        
        var colors = 10
        document.getElementById("ps").addEventListener("change", pxsize, false);
        function pxsize(event) {
            size = event.target.value;
            document.getElementById("pxs").innerText = size;
            $('.pixel').css('width',size)
            $('.pixel').css('height',size)
            $("#canvas").css('background-size', (size))
        }
        

        var color = "black"; var key = false; var selecteditem = 2
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

        function save() {
            
        }

        function changeShadow(shadowNS) {
            console.log('shadow is '+shadowNS);
            var shc;
            var elems = document.getElementsByClassName('pixel');
                for (var i = 0; i < elems.length; i++) {
                    if (elems[i].style.backgroundColor !== 'transparent') {
                    if (shadowNS == 'color') {
                        shc = $(elems[i]).css('background-color');
                        $(elems[i]).css('box-shadow', '3px 3px 10px '+shc);
                        console.log(shc);
                    }
                    if (shadowNS == 'black') {
                        shc = 'black';
                        $(elems[i]).css('box-shadow', '3px 3px 10px '+shc);
                        console.log(shc);
                    }
                    if (!['black', 'color'].includes(shadowNS)) {
                        $(elems[i]).css('box-shadow', '');
                    }
                    
                }
            }
        }

        $('#sc').change(function(){
            shadow = $('#sc option:selected').val();
            console.log('attempted shadowchange '+shadow);
            updateShadow()
        })

        function updateShadow() {
            changeShadow(shadow)
        }

        function myFunc(x) {
            x.style.backgroundColor = color
                if ((color == 'transparent') | (color !== '')) {
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

        function draw(element) {
            if (key) {
                element.style.backgroundColor = color
                if (color == 'transparent') {
                    element.style.boxShadow = '';
                } else {
                if (shadow == 'black') {$(element).css("box-shadow", '3px 3px 10px black');}
                if (shadow == 'color') {$(element).css("box-shadow", '3px 3px 10px '+color);}
                }
            }
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
        })
        

        function tableCreate(h, w){
            var div = document.createElement("div");
            div.classList.add("canvasbox", "fleft");
            div.id = "tb";
            var body = document.body,
                tbl  = document.createElement('table');
            tbl.setAttribute("class", "SIZED border");
            tbl.setAttribute("cellspacing", "0");
            tbl.setAttribute("rowspacing", "0");
            tbl.setAttribute("id", "canvas");
            for(var i = 0; i < h; i++){
                var tr = tbl.insertRow();
                for(var j = 0; j < w; j++){
                    if(i == w && j == 1){
                        break;
                    } else {
                        var td = tr.insertCell();
                        td.setAttribute("onclick", "myFunc(this)");
                        td.setAttribute("onmouseover", "draw(this)");
                        td.setAttribute("class", "pixel ");
                        td.setAttribute('id', (i+'-'+j));
                        td.setAttribute('style', 'background-color: transparent;')

                    }
                }
            }
            div.appendChild(tbl);
            body.appendChild(div)
            $(".pixel").css({"width": size, "height": size});
            
            return true;
        }

        function newCanvas() {
            var input = prompt("Canvas Size (width, height)").replace(" ", "").split(",");
            var valid = input.every(function(e) {return Boolean(Number(e))})
            if (input.length == 2 && valid) {
                document.getElementById("canvas").remove();
                if (tableCreate(Number(input[0]), Number(input[1]))) {
                    document.getElementById("canvas")[0].remove();
                } else {
                    alert("Oops, something went wrong!")
                }
            } else {
                alert("Oops, something went wrong!")
            }
        }
        tableCreate(50, 50)
   
        
