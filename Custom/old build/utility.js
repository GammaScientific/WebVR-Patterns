/*
    Contains functions that are integral to the utility of the tool.
    These include click checking, removing entitities, changing the currently displayed scene, resetting the scene and more.
*/

/* selects a new entity for editing*/
function selectNew(clickedEntity){
    /* Check if entity was clicked on or selected via dropdown */
    if(clickedEntity != null){ /* if clicked */
        selectedEntity = clickedEntity; /* updated selected entity */
        entitySelector.value = clickedEntity.getAttribute("id"); /* update dropdown */
    } else { /* if selected via dropdown */
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text()); /* update selected entity */

    }
    /* Update stats in edit section */
    if(specificSettings.style.gridTemplateRows == "100% 0% 0% 0% 0% 0%"){
        hideSpecific();
    }
    hideEditStats(); /* hide section briefly */
    updateStats(); /* update stats */
    toggleAddEdit(null); /* re-display section */
    updateAnimationList(selectedEntity)
    if(animationList.childElementCount == 0){
        animationList.setAttribute('selectedIndex',"")
    } else {
        animationList.setAttribute('selectedIndex',0)
    }

    highlightSelection(selectedEntity);
}

/* Removes current entity */
function removeEntity(){
    if(selectedEntity == null){
        alert('No entities added');
        return
    }
    let conf = confirm("Delete the selected entity?");
    if(!conf){
        return
    }
    els.splice(els.indexOf(selectedEntity),1);
    pool.splice(pool.indexOf(selectedEntity.object3D),1);
    entityCanvas.removeChild(selectedEntity);
    for (var i=0; i<entitySelector.length; i++) {
        if (entitySelector.options[i].value == selectedEntity.id)
            entitySelector.remove(i);
    }
    if(els.length == 0){
        utility.checked = false;
        toggleAddEdit(true);
        selectedEntity = null;
    } else {
        selectNew(null);
    }
    numAdded--;
    updateJSON()
}

function duplicateEntity(){
    if(selectedEntity == null){
        alert('No entities added');
        return
    }
    // get entity id and increment by 1
    key = selectedEntity.getAttribute("id");
    el = document.createElement("a-entity"); /* create entity */
    if(key.includes("circle")){ /* circle exclusive */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry);
        el.setAttribute("fill",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].fill);
    } else if(key.includes("plane")){ /* plane exclusive */
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry);
        if(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.src == ""){
            drawPlaneBorder(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].widthReal,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].fill.val,hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color),el);
        }   
        el.setAttribute("fill",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].fill);
    } else if(key.includes("triangle")){ /* triangle exclusive */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].geometry);
    } else if (key.includes("gradient")){
        el.setAttribute("id", "gradient"+gradientNum++);
        drawGradient(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.width,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].numBars,hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color),hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2.val),el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2)
    } else if (key.includes("grille")){
        el.setAttribute("id", "grille"+grilleNum++);
        drawGrille(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.width,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].childGeometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].numBars,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2.val,el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2)
    } else if (key.includes("checkerboard")){
        el.setAttribute("id", "checkerboard"+checkerboardNum++);
        drawCheckerboard(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].rows,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].cols,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].tileSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2.val,el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].color2)
    } else if (key.includes("circularDotarray")){
        el.setAttribute("id", "circularDotarray"+circularDotarrayNum++);
        drawCircularDotArray(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].arraySpacing.val,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].circles,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].dots,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].circleSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot.val,el);
        el.setAttribute("arraySpacing",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].arraySpacing);
        el.setAttribute("toggleCenterDot",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot);
    } else if (key.includes("dotarray")){
        el.setAttribute("id", "dotarray"+dotarrayNum++);
        drawDotArray(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].rows,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].cols,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].circleSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].spacing.val,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot.val,el);
        el.setAttribute("arraySpacing",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].spacing);
        el.setAttribute("toggleCenterDot",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].toggleCenterDot);
    } else if (key.includes("bullseye")){
        el.setAttribute("id", "bullseye"+bullseyeNum++);
        drawBullseye(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].ringPitch,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].numRings,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material.color,el);
    } else if(key.includes("text")){
        el.setAttribute("id", "text"+textNum++);
        el.setAttribute("text",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].text);
    } else if(key.includes("timer")){
        el.setAttribute("id", "timer"+timerNum++);
        el.setAttribute("text",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].text);
    }

    /* sets stats */
    el.setAttribute("angle", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].angle);
    el.setAttribute("advanced", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].advanced);
    el.setAttribute("position", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].movement.origin);
    let mat = null;
    if(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material){
        mat = JSON.parse(JSON.stringify(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material))

        for(let i = 0; i < texture.options.length; i++){
            if(texture.options[i].text == mat.src){
                mat.src = "#"+texture.options[i].value;
                break;
            }
        }
    }
    //let mat = JSON.parse(JSON.stringify(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].material))
    
    
    el.setAttribute("material", mat);
    el.setAttribute("rotation", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].rotation);

    el.setAttribute("movement", JSON.parse(JSON.stringify(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id][key].movement)));

    el.setAttribute("click-checker","");
    numAdded++;
    entityCanvas.appendChild(el); /* adds entity to scene */

    /* adds option to dropdown */
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* adds entity to list of created entities */
    pool.push(el.object3D);
    updateJSON();
    setTimeout(() => {  selectNew(el) }, 100);
}

/* resets current scene */
function resetScene(){
    let conf = confirm("Reset the selected pattern?");
    if(!conf){
        return
    }
    planeNum = 0;
    circleNum = 0;
    triangleNum = 0;
    gradientNum = 0;
    checkerboardNum = 0;
    grilleNum = 0;
    dotarrayNum = 0;
    circularDotarrayNum = 0;
    bullseyeNum = 0;
    timerNum = 0;
    textNum = 0;
    stopAllMovement();
    movementKeyBinds = {}
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
    } 
    while(entitySelector.childElementCount != 0){
        entitySelector.remove(entitySelector.children[0])
   }
    movementIcon.className = "fa-solid fa-play"
    $('#skyCol').minicolors('value', '#000000');
    els = []
    updateJSON()
    selectedEntity = null
}

/* used to click through current pattern */
function displayNext(direction){
    if(direction){
        // right
        if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            return
        }
        if(parseInt(patternList.getAttribute('selectedIndex')) == patternList.children.length-1){
            patternList.children[0].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        } else {
            patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        }        
        
    } else {
        // left
        if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            return
        }
        if(parseInt(patternList.getAttribute('selectedIndex')) == 0){
            patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        } else {
            patternList.children[parseInt(patternList.getAttribute('selectedIndex'))-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        }
        
    }
    
    $('#patternDisplay').trigger('change')
}

/* adds a pattern to pattern list */
function addPattern(){
    /*if(scenes[packageSelect.value][patternName] != null){
        alert('A pattern with this name already exists');
        return;
    }*/
    if(packageSelect.value == ''){
        alert('No package selected')
        return
    }
    let patternName = prompt("Enter a pattern name: ")
    if(patternName == null){
        return
    }
    while(patternName == ""){
        patternName = prompt("Enter a valid pattern name: ")
    }
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(patternName)){
        alert('Pattern name is invalid. '+ patternName +' Limit names to only alphanumerics, - , _ , or spaces.')
        return;
    }
    if(scenes[packageSelect.value][patternName] != null){
        alert('A pattern with this name already exists');
        return;
    }

    currName = ''
    if(Object.keys(names[packageSelect.value]).indexOf(patternName) == -1){
        names[packageSelect.value][patternName] = 1
        currName = patternName
    } else {
        currName = patternName+' ('+names[packageSelect.value][patternName]+')'
        names[packageSelect.value][patternName] = names[packageSelect.value][patternName] + 1
    }
    let textContent = currName;
    if(currName.length > 20){
        textContent = currName.substring(0,20)+"..."
    }
    scenes[packageSelect.value][currName] = {sky: {skyColor: '#000000'}}
    var toggle_button = '<li id="'+currName+'">'+textContent+'</li>';

    $('#items-list').append(toggle_button)
    
    item = document.getElementById(currName)
    $(item).prop('draggable', true)
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropped)
    item.addEventListener('dragenter', cancelDefault)
    item.addEventListener('dragover', cancelDefault)
    item.addEventListener('click',selectPattern)
    //pattern.options.add(new Option(patternName, patternName))
    
    patternList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
      });
      patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
}

function addMovementAnim(){
    var toggle_button = '<li>Pause</li>';
    let el = document.createElement('li');
    el.innerText = "Pause"

    el.setAttribute('draggable',true)
    el.addEventListener('dragstart', dragStart)
    el.addEventListener('drop', droppedAnim)
    el.addEventListener('dragenter', cancelDefault)
    el.addEventListener('dragover', cancelDefault)
    el.addEventListener('click',selectAnimation)

    animationList.appendChild(el)


    

    
    animationList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
    });
    let movementComponent = selectedEntity.getAttribute('movement');
    if(selectedEntity.getAttribute('advanced').val){
        movementComponent.startPoints.push({x: 0, y: 0, z: -250});
        movementComponent.endPoints.push({x: 0, y: 0, z: -250});
        movementComponent.initialVelocities.push(0);
        movementComponent.accelerations.push(0);
        movementComponent.types.push('Pause');
    } else {
        movementComponent.startPoints.push({theta: 0, y: 0, r: -250});
        movementComponent.endPoints.push({theta: 0, y: 0, r: -250});
        movementComponent.initialVelocities.push(0);
        movementComponent.accelerations.push(0);
        movementComponent.types.push('Pause');
    }
    

    
}

function removeMovementAnim(){
    // remove animation from entity
    if(animationList.childElementCount == 0){
        return
    }
    stopMovement(selectedEntity)

    let index = parseInt(animationList.getAttribute('selectedIndex'))
    let i = 0;
    let counter = -1;
    let movementComponent = selectedEntity.getAttribute('movement');
    // have to take into account rebounds from rubberband
    while(i < movementComponent.types.length){
      if(movementComponent.types[i] != 'Rebound'){
        counter++;
        if(counter == index){
          break
        }
      }
      i++;
    }

    
    if(movementComponent.types[i] == 'Rubberband'){
        // need to remove this and also and rebound entry
        movementComponent.types.splice(i,2)
        movementComponent.startPoints.splice(i,2)
        movementComponent.endPoints.splice(i,2)
        movementComponent.initialVelocities.splice(i,2)
        movementComponent.accelerations.splice(i,2)
    } else {
        movementComponent.types.splice(i,1)
        movementComponent.startPoints.splice(i,1)
        movementComponent.endPoints.splice(i,1)
        movementComponent.initialVelocities.splice(i,1)
        movementComponent.accelerations.splice(i,1)
    }
    animationList.removeChild(animationList.children[i])
    animationList.setAttribute('selectedIndex',"")
    updateAnimationUI(selectedEntity,-1)
    movementTypeIn.disabled = true

    updateJSON();
}

/* removes current pattern from pattern list */
function removePattern(){
    if(patternList.childElementCount == 0 || isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    } 
    let conf = confirm("Delete the selected pattern?");
    if(!conf){
        return
    }
    let i = 0;
    indices = []
    while(i < patternList.children.length){
        if(patternList.children[i].style.background == 'rgb(243, 152, 20)'){
            indices.push(i)
        }
        i++;
    }
    children = []
    revertChanges()
    indices.forEach(ind => {
        delete scenes[packageSelect.value][patternList.children[ind].id]
        //if(names[packageSelect.value][patternList.children[ind].textContent] == 1){
        //    delete names[packageSelect.value][patternList.children[ind].textContent]
        //}
        children.push(patternList.children[ind])
    })
    children.forEach(child =>{
        patternList.removeChild(child)
    })
    patternList.setAttribute('selectedIndex',null);
}

/* function used to remove changes made to a scene */
function revertChanges(){
    sky.setAttribute('material',{color: '#000000'})
    stopAll()
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
       }
       while(entitySelector.childElementCount != 0){
            entitySelector.remove(entitySelector.children[0])
       }
        els = []
        pool = []
        circleNum = 0; /* number of circles created */
        planeNum = 0; /* number of planes created */
        triangleNum = 0; /* number of triangles created */
        gradientNum = 0; /* number of gradients created */
        checkerboardNum = 0; /* number of checkerboards created */
        grilleNum = 0;
        dotarrayNum = 0;
        circularDotarrayNum = 0;
        bullseyeNum = 0;
        textureNum = 0;
        timerNum = 0;
        textNum = 0;
        numAdded = 0;
        selectedEntity = null;
        movementKeyBinds = {}
}


var colorChange = true;

/* handles switches to advanced mode */
val = false;
function switchToAdvanced(e){
    e.stopPropagation()
    newVal = !selectedEntity.getAttribute('advanced').val
    selectedEntity.setAttribute('advanced', {val: newVal});
    mov = selectedEntity.getAttribute('movement')
    let i = 0;
    while(i < mov.types.length){
        if(newVal){
            if(mov.endPoints[i].r != null){
                mov.endPoints[i] = {x: -mov.endPoints[i].r*Math.sin((mov.endPoints[i].theta*Math.PI)/180), y: mov.endPoints[i].y, z: mov.endPoints[i].r * Math.cos((mov.endPoints[i].theta*Math.PI)/180)}
                mov.startPoints[i] = {x: -mov.startPoints[i].r*Math.sin((mov.startPoints[i].theta*Math.PI)/180), y: mov.startPoints[i].y, z: mov.startPoints[i].r * Math.cos((mov.startPoints[i].theta*Math.PI)/180)}
            }
        } else {
            if(mov.endPoints[i].r == null){
                mov.endPoints[i] = {r: Math.sqrt(mov.endPoints[i].x*mov.endPoints[i].x+mov.endPoints[i].z*mov.endPoints[i].z), theta: Math.atan(mov.endPoints[i].z/mov.endPoints[i].x), y: mov.endPoints[i].y}
                mov.startPoints[i] = {r: Math.sqrt(mov.startPoints[i].x*mov.startPoints[i].x+mov.startPoints[i].z*mov.startPoints[i].z), theta: Math.atan(mov.startPoints[i].z/mov.startPoints[i].x), y: mov.startPoints[i].y}
            }
        }
        i++;
    }
    selectedEntity.setAttribute('movement',mov)
    endZ.disabled = !endZ.disabled
    advanced.style.backgroundColor == '' ? advanced.style.backgroundColor = '#00FF00' : advanced.style.backgroundColor =''
    updateStats()
  }

/* listens for entering vr and removes restrictions on clicking through patterns */
scene.addEventListener('enter-vr',function(e){
    block = false;
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No scene is selected, please exit immersive mode and select a scene.')
    }
    controlsInterval = setInterval(findControls,10);
  });

/* listens for exiting vr and restricts clicking through patterns */
scene.addEventListener('exit-vr',function(){
    block = true;
    toggleAddEdit(false);
  });

async function highlightSelection(ent){
    if(block){
        return
    }
    newPos = {x: 0, y: 0, z: -5};
    if(ent.id.includes("plane")){
        let width = (ent.children.length == 0 ? ent.components.geometry.attrValue.width : ent.children[2].components.geometry.attrValue.width)
        newGeom = {primitive: 'plane', width: width*1.5, height: ent.getAttribute('geometry').height*1.5};
    } else if(selectedEntity.id.includes("circle")){
        newGeom = {primitive: 'ring', radiusOuter: ent.getAttribute('geometry').radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("triangle")){
        newGeom = {primitive: 'triangle', vertexA: {x: ent.getAttribute('geometry').vertexA.x*1.5 ,y: ent.getAttribute('geometry').vertexA.y*1.5 ,z: ent.getAttribute('geometry').vertexA.z*1.5}, vertexB: {x: ent.getAttribute('geometry').vertexB.x*1.5 ,y: ent.getAttribute('geometry').vertexB.y*1.5 ,z: ent.getAttribute('geometry').vertexB.z*1.5}, vertexC: {x: ent.getAttribute('geometry').vertexC.x*1.5 ,y: ent.getAttribute('geometry').vertexC.y*1.5 ,z: ent.getAttribute('geometry').vertexC.z*1.5}};
    } else if(selectedEntity.id.includes("checkerboard")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'plane', width: colNum*tileSizeNum*1.5, height: rowNum*tileSizeNum*1.5};
    } else if(selectedEntity.id.includes("gradient")){
        let width = ent.children[0].components.geometry.attrValue.width;
        let height = ent.children[0].components.geometry.attrValue.height;
        let numBars = ent.children.length;
        newGeom = {primitive: 'plane', width: width*numBars*1.25, height: height*1.5};
    } else if(selectedEntity.id.includes("grille")){
        let width = selectedEntity.children[0].components.geometry.attrValue.width;
        let height = selectedEntity.children[0].components.geometry.attrValue.height;
        let numBars = selectedEntity.children.length;
        newGeom = {primitive: 'plane', width: width*numBars*1.25, height: height*1.5};
    } else if(selectedEntity.id.includes("circularDotarray")){
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("dotarray")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    }  else if(selectedEntity.id.includes("bullseye")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("text") || selectedEntity.id.includes("timer")){
        let width = ent.components.text.attrValue.value.length * (ent.components.text.attrValue.width / ent.components.text.attrValue.wrapCount);
        let height = ent.components.text.attrValue.height;
        newGeom = {primitive: 'plane', width: width, height: height};
    }
    
    tmp = document.createElement('a-entity');
    tmp.setAttribute('id','tmp')
    tmp.setAttribute("geometry",newGeom);
    tmp.setAttribute('position',newPos);
    tmp.setAttribute("material", {shader: "flat", color: "#FFFF00"});
    ent.appendChild(tmp);
    await sleep(ent, tmp).then(() => {
        
    });
    
    


}

function sleep (par1, par2) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(clearHighlight(par1,par2)), 1000)
    })
  }

async function clearHighlight(ent){
    let i = ent.children.length-1;
    while (i >= 0) {
        if(ent.children[i].getAttribute('id') == 'tmp'){
            ent.children[i].parentNode.removeChild(ent.children[i]);
            i--;
        }
        i--;
    }
}

function renamePattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    }
    if(patternList.getAttribute('multi-select') == "true"){
        alert('Multiple patterns selected')
        return
    }
    let patternName = prompt("Enter a pattern name: ")
    if(patternName == null){
        return
    }
    while(patternName == "" ){
        patternName = prompt("Enter a valid pattern name: ")
    }
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(patternName)){
        alert('Pattern name is invalid. '+ patternName +' Limit names to only alphanumerics, - , _ , or spaces.')
        return;
    }
    if(scenes[packageSelect.value][patternName] != null){
        alert('A pattern with this name already exists');
        return;
    }
    oldName = patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id
    currScene = scenes[packageSelect.value][oldName]
    currName = ''
    if(Object.keys(names).indexOf(patternName) == -1){
        names[patternName] = 1
        currName = patternName
    } else {
        names[patternName] = names[patternName] + 1
        currName = patternName+''+names[patternName]
    }
    scenes[packageSelect.value][currName] = currScene
    delete scenes[packageSelect.value][oldName]

    patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id = currName

    if(currName.length > 20){
        patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].innerText = currName.substring(0,20)+"..."
    } else {
        patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].innerText = currName
    }
}

let clipboard;
function copyPattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    }
    let i = 0;
    indices = []
    while(i < patternList.children.length){
        if(patternList.children[i].style.background == 'rgb(243, 152, 20)'){
            indices.push(i)
        }
        i++;
    }
    clipboard = {}
    indices.forEach(ind => {
        clipboard[patternList.children[ind].id] = scenes[packageSelect.value][patternList.children[ind].id]
    })
}

function addPackage(){
    flag = false;
    let i = 0;
    if(packageSelect.options.length == 10){
        alert('There are already 10 packages.')
        return;
    }
    let packageName = prompt("Enter a package name: ");
    if(packageName == null){
        return
    }
    while(packageName == ""){
        packageName = prompt('Please enter a valid package name');
    }
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(packageName)){
        alert('Package name is invalid. '+ packageName +' Limit names to only alphanumerics, -, _, or spaces.')
        return;
    }
    if(scenes[packageName] != null){
        alert('A package with this name already exists');
        return;
    }
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == packageName){
            alert('A package with this name already exists');
            return
        }
        i++;
    }

    packageSelect.options.add(new Option(packageName,packageName))
    packages[packageName] = ''
    scenes[packageName] = {}
    names[packageName] = {}
    packageSelect.value = packageName
    changePackage();
}

function removePackage(){
    if(packageSelect.value == ''){
        alert('No package selected')
        return
    }
    let conf = confirm("Delete the selected package: "+packageSelect.value);
    packageName = packageSelect.value
    if(!conf){
        return
    }
    i = 0;
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == packageName){
            packageSelect.remove(i)
        }
        i++;
    }
    while(patternList.childElementCount != 0){
        patternList.removeChild(patternList.children[0])
    }
    delete scenes[packageName]
    delete names[packageName]
    revertChanges()
    if(packageSelect.value != ''){
        changePackage();
    }
    patternList.setAttribute('selectedIndex',null);
    if(packages[packageName] != ''){
        let newURL = window.location.href.replace(","+encodeURIComponent(packages[packageName]),'')
        newURL = newURL.replace(encodeURIComponent(packages[packageName])+",",'')
        newURL = newURL.replace(encodeURIComponent(packages[packageName]),'')
        if(newURL.split("?id=")[1] == ''){
            newURL = newURL.split("?id=")[0]
        }
        window.history.pushState('object', document.title, newURL);
    }
    delete packages[packageName]
}

function changePackage(){
    let i = 0;
    patternList.setAttribute('selectedIndex',"")
    while(patternList.children.length != 0){
        patternList.removeChild(patternList.children[0])
    }
    Object.keys(scenes[packageSelect.value]).forEach(currName =>{
        let textContent = currName;
        if(currName.length > 20){
            textContent = currName.substring(0,20)+"..."
        }

        var toggle_button = '<li id="'+currName+'">'+textContent+'</li>';
 
        
        $('#items-list').append(toggle_button)
        
        item = document.getElementById(currName)
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
        item.addEventListener('click',selectPattern)
    }
    )
    revertChanges()
}

function renamePackage(){
    if(packageSelect.options.length == 0){
        alert('No package selected')
        return
    }
    let packageName = prompt("Enter a package name: ");
    if(packageName == null){
        return
    }
    while(packageName == ""){
        packageName = prompt('Please enter a valid package name');
    }
    const re = /^[a-zA-Z0-9-_ ]+$/
    if(!re.test(packageName)){
        alert('Package name is invalid. '+ packageName +' Limit names to only alphanumerics, -, _, or spaces.')
        return;
    }
    if(scenes[packageName] != null){
        alert('A package with this name already exists');
        return;
    }


    oldName = packageSelect.value
    currPackage = scenes[packageSelect.value]
    
    scenes[packageName] = currPackage
    delete scenes[packageSelect.value]
    packageSelect.options[packageSelect.selectedIndex].value = packageName
    packageSelect.options[packageSelect.selectedIndex].text = packageName
    //patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].id = currName
}

function pastePattern(){
    if(clipboard == null){
        return;
    }
    /*if(scenes[packageSelect.value][clipboard.name] != null){
        alert('A scene with the name of the copied pattern already exists, please rename the scene')
        return
    }*/
    Object.keys(clipboard).forEach(name =>{
        currName = name.split(' (')[0];
        if(names[packageSelect.value][currName]){
            currName = currName + ' ('+names[packageSelect.value][currName]+')'
            names[packageSelect.value][name.split(' (')[0]] = names[packageSelect.value][name.split(' (')[0]] + 1

        } else {
            names[packageSelect.value][currName] = 1
        }

        scenes[packageSelect.value][currName] = clipboard[name]
        let textContent = currName;
        if(currName.length > 20){
            textContent = currName.substring(0,20)+"..."
        }

        var toggle_button = '<li id="'+currName+'">'+textContent+'</li>';

        $('#items-list').append(toggle_button)
        
        item = document.getElementById(currName)
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
        item.addEventListener('click',selectPattern)
    })
    patternList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
      });
    
}

function cutPattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No pattern selected')
        return
    }
    keysPressed["ctrl"] = false;
    keysPressed["x"] = false;
    copyPattern()
    removePattern()
}


var time;
var timeElapsed = 0;
function startTimer(){
    time = setInterval(() => {
        timeElapsed += 10;
        let timer = document.getElementById('timer0')
        let textVal = timer.getAttribute('text')
        let time = Math.floor(timeElapsed)
        let minutes = Math.floor(time/1000/60)
        time -= minutes*1000*60
        if(minutes < 10){
            minutes = "0"+minutes
        } else {
            minutes = ""+minutes
        }
        
        let seconds = Math.floor(time/1000)
        time -= seconds*1000
        if(seconds < 10){
            seconds = "0"+seconds
        } else {
            seconds = ""+seconds
        }
        if(time < 10){
            time = "00"+time
        } else if(time < 100){
            time = "0"+time
        } else {
            time = ""+time
        }

        textVal.value = minutes+":"+seconds+":"+time[0]+time[1]+" "
        timer.setAttribute('text',textVal)

    },10)
}

function toggleConsole() {
    if(debug.style.display == "block"){
        debug.style.display = "none";
    } else {
        debug.style.display = "block";

    }
}