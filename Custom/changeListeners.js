/* 
    Handles user input

*/

/* If the textbox for sky color is changed */
$('#skyCol').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        sky.setAttribute("material",{color: $("#skyCol").val()});
        if(colorChange){
            updateJSON();
        }
        colorChange = true
    },
});

/* If the textbox for x value is changed */
$("#x").change(function() {
    editEntity();
  });

/* If the textbox for y value is changed */
$("#y").change(function() {
    editEntity();
  });

/* If the textbox for z value is changed */
$("#z").change(function() {
    editEntity();
  });

/* If the textbox for color value is changed */
$('#color').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

$('#color2').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

/* If the textbox for x value is changed */
$("#texture").change(function() {
    if(texture.value == "none"){
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: ""});
        fillIn.style.display = "block";
        editEntity()
    } else {
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: "#"+texture.value});
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        if(typeof selectedEntity.getAttribute("material").src == "object"){
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(selectedEntity.getAttribute("material").src.naturalWidth/selectedEntity.getAttribute("material").src.naturalHeight)*250, height: .5*250});
        } else {
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(uploadedTextureFormat[texture.options[texture.selectedIndex].text].width/uploadedTextureFormat[texture.options[texture.selectedIndex].text].height)*250, height: .5*250});
        }
        if(selectedEntity.getAttribute("fill").isFull){
            if(selectedEntity.getAttribute("geometry").width > selectedEntity.getAttribute("geometry").height){
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").height, isFull: true});
            } else {
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").width, isFull: true});
            }
        }
        width.value = selectedEntity.getAttribute("geometry").width;
        height.value = selectedEntity.getAttribute("geometry").height;
        fill.value = selectedEntity.getAttribute("fill").val;
        fillIn.style.display = "none";
    }
  });
  

/* If the textbox for x value is changed */
$("#texture-input").change(function() {
    let i = 0;
    var j = 0;
    while(i < texture_input.files.length){
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploaded_image = reader.result;
        });
        
        var name = this.files[i].name;
        reader.readAsDataURL(this.files[i]);
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();
    
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            
            //Validate the File Height and Width.
            image.onload = function () {
                let k = 0;
                let skip = false;
                while(k < texture.options.length){
                    if(texture.options[k].text == texture_input.files[j].name){
                        skip = true;
                    }
                    k++;
                }
                if(!skip){
                    var height = this.height;
                    var width = this.width;
                    uploadedTextureFormat[texture_input.files[j].name] = {width: width, height: height};
                    var option = document.createElement("option"); 
                    option.text = texture_input.files[j++].name;
                    option.value = `url(${this.src})`;
                    texture.add(option);
                }
            };
        }
        i++;
    }

    /*editEntity();*/
  });

/* If the textbox for x value is changed */
$("#fill").change(function() {
    if(selectedEntity.id.includes("plane")){
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) <= parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
            alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else if(parseFloat($("#fill").val()) == parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    } else {
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if(parseFloat($("#radius").val()) < parseFloat($("#fill").val())){
            alert("Border too large, will change size of entity (0 < border <= radius)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#radius").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    }
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationZ").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationY").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotationX").change(function() {
    editEntity();
  });

/* If the textbox for radius value is changed */
$("#radius").change(function() {
    if(parseFloat($("#fill").val()) > parseFloat($("#radius").val()) || selectedEntity.getAttribute("fill").isFull){
        fill.value = parseFloat($("#radius").val());
        selectedEntity.setAttribute("fill",{val: parseFloat($("#radius").val()), isFull: true});
    }
    editEntity();
  });

/* If the textbox for width value is changed */
$("#width").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())) || (parseFloat($("#height").val()) > parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#width").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#width").val()), isFull: true});
        }
    }
    
    
    editEntity();
  });

/* If the textbox for height value is changed */
$("#height").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())) || (parseFloat($("#height").val()) < parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#height").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#height").val()), isFull: true});
        }
    }
    editEntity();
  });

/* If the textbox for vax value is changed */
$("#vax").change(function() {
    editEntity();
  });

/* If the textbox for vay value is changed */
$("#vay").change(function() {
    editEntity();
  });

/* If the textbox for vbx value is changed */
$("#vbx").change(function() {
    editEntity();
  });

/* If the textbox for vby value is changed */
$("#vby").change(function() {
    editEntity();
  });

/* If the textbox for vcx value is changed */
$("#vcx").change(function() {
    editEntity();
  });

/* If the textbox for vcy value is changed */
$("#vcy").change(function() {
    editEntity();
  });

/* If the textbox for numbers of bars value is changed */
$("#numBarsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of rows is changed */
$("#rowsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of cols is changed */
$("#colsIn").change(function() {
    editEntity();
  });

/* If the textbox for size of tiles is changed */
$("#tileSizeIn").change(function() {
    editEntity();
  });

/* sends entity back or forward one layer */
/*function sendBack(isback){
    let tmp = null;
    let selected = els.indexOf(selectedEntity); /* finds layer number of current entity */
    /* checks if back or forward */
    /*if(isback){*/ /* if back */
        /*if (selected != 0) {*/ /* if it is not on layer 0 */
            /* swap z values */
            /*tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected-1].getAttribute("position").z;
            els[selected-1].getAttribute("position").z = tmp;*/

            /* swap position in el arr (this preserves the layering order) */    
            /*tmp = els[selected];
            els[selected] = els[selected-1];
            els[selected-1] = tmp;
        }*/
    /*} else {*/ /* if forward */
        /*if (selected != els.length-1) {*/ /* if not the last layer */
            /* swap z values */
            /*tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected+1].getAttribute("position").z;
            els[selected+1].getAttribute("position").z = tmp;*/

            /* swap position in el arr (this preserves the layering order) */
            /*tmp = els[selected];
            els[selected] = els[selected+1];
            els[selected+1] = tmp;
        }
    }
}*/

/* Raycasting with orthographic camera */
/*var raycaster = new THREE.Raycaster();
raycaster.layers.set(0);
window.addEventListener("pointerup", function(e) {
    var screenPos = new THREE.Vector2();
    
    screenPos.x = (e.clientX / window.innerWidth) * 2 - 1;
    screenPos.y = - (e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(screenPos, scene.camera);

    var rays = raycaster.intersectObjects(pool, true);
    let i = rays.length;
    if(i > 0){
        currMin = rays[0].distance;
        selected = rays[0].object.el;
        while (i > 0) {
            i--;
            if(rays[i].distance < currMin){
                currMin = rays[i].distance;
                selected = rays[i].object.el;
            }
        }
        selected = document.getElementById(selected.id.split("-")[0]);
        console.log(selected);
        selectNew(selected);
    }
});*/


var scenes = {default: {sky: {skyColor: '#000000'}}}
finished = false
var ind = 0
var block = false
/* if JSON is uploaded */
scene_display_input.addEventListener("change", function() {

    var myLoop = slowLoop(scene_display_input.files, (itm, idx, cb)=>{
    
        setTimeout(()=>{
            const reader = new FileReader();
            reader.addEventListener("load", () => {

                fileContent = JSON.parse(reader.result);
                let arr = Object.keys(fileContent['scenes'])
                let i = 0;
                while(i < arr.length){
                    if(Object.keys(scenes).indexOf(arr[i]) != -1){
                        scenes[arr[i]+"1"] = fileContent['scenes'][arr[i]]
                    } else {
                        scenes[arr[i]] = fileContent['scenes'][arr[i]]
                    }
                    
                    i++;
                }
                textures = fileContent['textures']['textureValues']
                uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']
                cb();
            });
            if(itm.name.split(".")[1] != "JSON"){
                alert("Invalid file type");
                scene_display_input.value = ""
                return;
            }
            if(Object.keys(scenes).indexOf(itm.name.split(".")[0]) != -1){
                itm.name = itm.name.split(".")[0]+"1"+itm.name.split(".")[1]
                console.log(itm)

            }
            reader.readAsText(itm);
            

            
            
            // call cb when finished
            
            
        }, 100);
        
    });
    
    // when it's done....
    myLoop.then(()=>{
        console.log('no')
        patternList.innerHTML = ''
        let arr = Object.keys(scenes)
        let len = arr.length
        let i = 0;
        let len2 = texture.options.length;
        currTextures = []
        while(i < len2){
            currTextures.push(texture.options[i].text)
            i++;
        }
        i = 0;
        uploadedTextures = []
        while(i < textures.length){
            uploadedTextures.push(textures[i].text)
            i++;
        }
        newTextures = [...new Set([...uploadedTextures,...currTextures])]
        console.log(newTextures)
        newTextures.forEach(text => {
            var option = document.createElement("option"); 
            if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
                option.text = textures[uploadedTextures.indexOf(text)].text
                option.value = textures[uploadedTextures.indexOf(text)].val
                texture.add(option);
            }
            

        })

    
        newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(uploadedTextureFormats)])]
        console.log(newUploadedTextureFormat)
        tmp = {}
        newUploadedTextureFormat.forEach(texture => {
            if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
                tmp[texture] = uploadedTextureFormat[texture]
            } else {
                tmp[texture] = uploadedTextureFormats[texture]
            }
        });
        uploadedTextureFormat = tmp

        i = 0;
        while(i < len){
            var toggle_button = '<p><input type="checkbox" id="'+arr[i]+'" name="'+arr[i]+'" onclick="handlePatternSelect(this)"'
            let res = Array.from(patternDisplay.children).reduce(function(acc, x) {
                acc = acc || x.text == arr[i]
                return acc;
              }, false);
            if(res == true){
                toggle_button += 'checked/>'
            
            } else {
                toggle_button += '/>'
            }
            toggle_button += '<label for="'+arr[i]+'">'+arr[i]+'</label></p>';
            $('#patternList').append(toggle_button)
            //pattern.options.add(new Option(arr[i], arr[i]))
            i++
        }

    
    });

/**
 * Execute the loopBody function once for each item in the items array, 
 * waiting for the done function (which is passed into the loopBody function)
 * to be called before proceeding to the next item in the array.
 * @param {Array} items - The array of items to iterate through
 * @param {Function} loopBody - A function to execute on each item in the array.
 *		This function is passed 3 arguments - 
 *			1. The item in the current iteration,
 *			2. The index of the item in the array,
 *			3. A function to be called when the iteration may continue.
 * @returns {Promise} - A promise that is resolved when all the items in the 
 *		in the array have been iterated through.
 */

 // code taken from here https://stackoverflow.com/questions/48767979/javascript-how-to-wait-event-listener-end-to-next-iteration
function slowLoop(items, loopBody) {
	return new Promise(f => {
		done = arguments[2] || f;
		idx = arguments[3] || 0;
		let cb = items[idx + 1] ? () => slowLoop(items, loopBody, done, idx + 1) : done;
		loopBody(items[idx], idx, cb);
	});
}
    
});