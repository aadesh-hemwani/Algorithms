let canvas = document.getElementById("canvas");
let count = 0;
let start = document.getElementById("start");
let end = document.getElementById("end");
let mid = document.getElementById("mid");
let btn = document.getElementById("btn");
let startArrow = document.getElementById("startArrow");
let width = screen.width-80;
let eles = Math.floor(width/40);

function createBlock(value){
    let div = document.createElement("div");
    div.innerHTML = value;
    div.classList.add("block");

    let index = document.createElement("div");
    index.innerHTML = count;
    index.classList.add("index");
    div.appendChild(index);

    div.style.transform = `translateX(${count * 40}px)`;
    window.requestAnimationFrame(function(){
        div.classList.add("insertAnimate");
    });
    canvas.appendChild(div);
    count++;
}
 
async function generateArray(){
    let array = [];
    let num = 0;
    for(let i=0; i<eles; i++){
        num = Math.floor((Math.random() * 200) + 1);
        array.push(num);
    }
    array.sort((a, b)=> a-b);
    for(let x=0; x<array.length; ++x){
        createBlock(array[x]);
        await new Promise(resolve =>{
            setTimeout(()=> resolve(), 100);
        });
    }
}

function markStart(element){
    let left = element.style.transform;
    // s.style.transform = left;
    // console.log(s.style.top);
}


async function bs(){
    let blocks = document.querySelectorAll(".block");
    let find = document.getElementById("value").value;
    let found = false;
    for(let x=0; x<blocks.length; x++){
        blocks[x].style.background = "rgb(199, 234, 248)";    
    }

    if(find !== ""){
        btn.disabled = true;    
        let target = parseInt(find);
        let i = 0;
        let j = blocks.length-1;

        let process = document.getElementById("process");
        while(i <= j){
            start.innerHTML = i;
            end.innerHTML = j;
            let m = Math.floor((i+j)/2);
            mid.innerHTML = m;
            blocks[m].style.backgroundColor = "#ff595f";

            let mValue = parseInt(blocks[m].innerHTML);
            
            if(mValue === target){
                process.innerHTML = `${target} found at index ${m}`
                blocks[m].style.backgroundColor = "#68d47d";
                found = true;
                break;
            }
            
            else if(target < mValue){
                process.innerHTML = `${target} is less than ${mValue}`
                await new Promise(resolve =>{
                    setTimeout(()=> resolve(), 700);
                });
                for(let x=m; x<=j; x++){
                    blocks[x].style.background = "#b8bfb9";    
                    await new Promise(resolve =>{
                        setTimeout(()=> resolve(), 150);
                    });
                }
                j = m-1;
            }
            else{
                process.innerHTML = `${target} is greater than ${mValue}`
                await new Promise(resolve =>{
                    setTimeout(()=> resolve(), 700);
                });
                for(let x=i; x<=m; x++){
                    blocks[x].style.background = "#b8bfb9";
                    markStart(blocks[x]);
                    await new Promise(resolve =>{
                        setTimeout(()=> resolve(), 150);
                    });
                }
                i = m+1;
            }
        }
    
        if(!found){
            process.innerHTML = `${target} does not exist`
        }
        btn.disabled = false;
    }
}

generateArray();