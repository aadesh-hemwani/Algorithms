let count = 0;
let canvas = document.getElementById("canvas");
let height = screen.height - 150;
let totalBlocks = Math.floor(height/50);
let stackBox = document.getElementById("stackBox");
stackBox.style.height = `${55*totalBlocks}px`
function createBlock(value){
    var div = document.createElement("div");
    div.innerHTML = value;
    div.classList.add("block");
    div.style.transform = `translateY(-${count * 55}px)`;
    div.classList.add("pushAnimate");
    count++;
    canvas.appendChild(div);
}

function push(){
    let value = document.getElementById("insert");
    
    if(count >= totalBlocks){
        alert("STACK FULL");
    }
    if(value.value !== ""  && count < totalBlocks){
        createBlock(value.value);
        
    }
    value.value = "";
    
}

function pop(){
    let blocks = document.querySelectorAll(".block");
    if(blocks.length !== 0){
        let topBlock = blocks[blocks.length-1];
        window.requestAnimationFrame(function() {
            topBlock.classList.add("popAnimate");
        });   
        new Promise(resolve =>{
            setTimeout(() => {
                topBlock.parentNode.removeChild(topBlock);
                count--;
                resolve();
            }, 1000);
        });
    }
    else{
        alert("STACK EMPTY");
    }
}