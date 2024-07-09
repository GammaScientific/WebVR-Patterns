//client for websocket 5/29/2024
const ws = new WebSocket('wss://192.168.99.109:7890');

ws.addEventListener('open',(event) =>{
    console.log('connected to the server');
});

ws.addEventListener('message',(event) =>{
    console.log('Message from the server: ', event.data);
    handleKeydownEvent(event.data);
})

ws.addEventListener('close',(event)=>{
    console.log('Disconnected from the server');
})

// Function to handle keydown event
function handleKeydownEvent(data){
    const event = new KeyboardEvent('keydown',{key:data});
    document.dispatchEvent(event);
}


/* 2/21/2024 Display the scene with keyboard input*/
document.addEventListener("keydown",(event)=>{
    console.log(event)
    if(event.key === "1"){
        patternList.children[0].dispatchEvent(new Event('click',{target: patternList.children[0]}));
        $('#patternDisplay').trigger('change')
    }else if(event.key === "2"){
        patternList.children[1].dispatchEvent(new Event('click',{target: patternList.children[1]}));
        $('#patternDisplay').trigger('change')
    }else if(event.key === "3"){
        patternList.children[2].dispatchEvent(new Event('click',{target: patternList.children[2]}));
        $('#patternDisplay').trigger('change')
    }else if(event.key === "4"){
        patternList.children[3].dispatchEvent(new Event('click',{target: patternList.children[3]}));
        $('#patternDisplay').trigger('change')
    }else if(event.key === "5"){
        patternList.children[4].dispatchEvent(new Event('click',{target: patternList.children[4]}));
        $('#patternDisplay').trigger('change')
    }else if(event.key === "6"){
        patternList.children[5].dispatchEvent(new Event('click',{target: patternList.children[5]}));
        $('#patternDisplay').trigger('change')
    }else if(event.key === "7"){
        patternList.children[6].dispatchEvent(new Event('click',{target: patternList.children[6]}));
        $('#patternDisplay').trigger('change')
    }
})
