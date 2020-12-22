var canvas = document.getElementById("canvas");
var count = 0;
speed = 1000;

function createBlock(num){
  if(num){
    // create a new div element in DOM
    var div = document.createElement("div");
    div.innerHTML = num;
    div.classList.add("block");
    div.style.transform = `translateX(${count * 62}px)`;
    count++;
    canvas.appendChild(div);
  }
}

function speedOmeter(){
    let slider = document.getElementById("speedSlider").value;
    if(slider < 10){
        speed = 3000;
    }
    else if(slider > 10 && slider < 30){
        speed = 2000;
    }
    else if(slider > 30 && slider < 50){
        speed = 1000;
    }
    else if(slider > 50 && slider < 70){
        speed = 500;
    }
    else if(slider > 70){
        speed = 300;
    }
}


function insert(){
   var num = document.getElementById("insert").value;
   createBlock(num);
    // clear the input field
    document.getElementById("insert").value = "";
}

function rand(){
   var num = Math.floor((Math.random() * 100) + 1);
   createBlock(num);
}

function swap(block1, block2){
    return new Promise(resolve =>{
        const style1 = window.getComputedStyle(block1).getPropertyValue("transform");
        const style2 = window.getComputedStyle(block2).getPropertyValue("transform");
        
        block1.style.transform = style2;
        block2.style.transform = style1;
        
        window.requestAnimationFrame(function() {
            setTimeout(() => {
              canvas.insertBefore(block2, block1);
              resolve();
            }, speed);
          });   
    });
}

async function bubble_Sort(){
    let blocks = document.querySelectorAll(".block");
    var len = blocks.length, i, j;
    for (i=0; i < len-1; i++){
        for (j=0; j < len-i-1; j++){
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            await new Promise(resolve =>{
                setTimeout(()=> resolve(), speed);
            });
            const value1 = Number(blocks[j].innerHTML);
            const value2 = Number(blocks[j + 1].innerHTML);
            
            if (value1 > value2){
               await swap(blocks[j], blocks[j+1]);
               blocks = document.querySelectorAll(".block");
           }
           blocks[j].style.backgroundColor = "transparent";
           blocks[j + 1].style.backgroundColor = "transparent";
        }
        blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
    }
    blocks[0].style.backgroundColor = "#13CE66";
}

function arrayForMergeSort(){
    let blocks = document.querySelectorAll(".block");
    let array = [];
    for (let i=0; i < blocks.length; i++){
        array.push(Number(blocks[i].innerHTML));
    }
    console.log(mergeSort(array));
}


function mergeSort(array){
    if (array.length <= 1) return array;

    let mid = Math.floor(array.length/ 2);
    console.log(mid)
    left = array.slice(0, mid);
    right = array.slice(mid);
    

    mergeSort(left);
    mergeSort(right);

    console.log(left)
    console.log(right)
    let i = 0,  j = 0, k = 0;

    while(i < left.length && j < right.length){
        if (left[i] < right[j]){
            array[k] = left[i];
            i++;
        }else{
            array[k] = right[j];
            j++;
            k++;
        }
    }
        

    while(i < left.length){
        array[k] = left[i];
        i++;
        k++;
    }
    while(j < right.length ){
        array[k] = right[j];
        j++;
        k++;
    }
        
    return array;

    
}


function sort(){
    speedOmeter();
    bubble_Sort();
}

function clean(){
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    count=0;
}
