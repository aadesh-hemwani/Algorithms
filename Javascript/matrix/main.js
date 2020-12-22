function Matrix(){
    this.canvas = document.getElementById("canvas");
    this.rows = 0;
    this.cols = 0;
    this.directions = [[1, 0], [0, -1], [0, 1], [-1, 0]];
    this.directions2 = [[2, 0], [0, -2], [0, 2], [-2, 0]];
    this.wall = "rgb(12, 53, 71)";
    this.path = "rgb(111, 227, 127)";
    this.visited = "rgb(201, 73, 73)";
    this.explore = "rgb(118, 189, 219)";
    this.start_block = [0, 0];
    this.end_block = [0, 0];
    this.blocks = [];
    this.startNotMarked = false;
    this.endNotMarked = false;
    this.btns = false;
}

Matrix.prototype.buildMatrix =async function(){
    this.toggelBtns();
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    this.rows = parseInt(document.getElementById("rows").value)+2;
    this.cols = parseInt(document.getElementById("columns").value)+2;
    
    if(this.rows % 2 === 0) this.rows++;
    if(this.cols % 2 === 0) this.cols++;
        
    for(let i=0; i<this.rows; ++i){
        let tr = document.createElement("tr");
        tr.classList.add("row");
        for(let j=0; j<this.cols; ++j){
            let td = document.createElement("td");
            td.onclick = this.click.bind(this);
            td.classList.add("block");
            tr.appendChild(td);    
        }
        canvas.appendChild(tr);
    }
    canvas.style.width = `${this.cols*10+this.cols}px`;
    canvas.style.height = `${this.rows*10+this.rows}px`;
    this.blocks = document.querySelectorAll(".row");
    this.start_block[0] = 1;
    this.start_block[1] = 1;
    
    this.blocks[1].childNodes[1].innerHTML = "S";
    this.end_block[0] = this.blocks.length-2;
    this.end_block[1] = 1;
    this.blocks[this.end_block[0]].childNodes[this.end_block[1]].innerHTML = "E";
    await this.makeWalls();
    await this.recursiveBTMaze(1, 1);

    this.toggelBtns();
}

Matrix.prototype.buildWall = function(r, c){
    let clickedBlock = this.blocks[r].childNodes[c];
    if(clickedBlock.style.backgroundColor === this.wall){
        clickedBlock.classList.add("breakWall");
        clickedBlock.style.backgroundColor = "white";
    }else{
        clickedBlock.classList.add("createWall");
        clickedBlock.style.backgroundColor = this.wall;
    }
}

Matrix.prototype.recursiveDFS = async function (r, c){
    if(r >=0 && r < this.blocks.length && c >=0 && c < this.blocks[0].childElementCount && this.blocks[r].childNodes[c].style.backgroundColor !== this.visited && this.blocks[r].childNodes[c].style.backgroundColor !== this.explore &&this.blocks[r].childNodes[c].style.backgroundColor !== this.wall){    
        block = this.blocks[r].childNodes[c];
        block.style.backgroundColor = this.explore;
        if(r===this.end_block[0] && c ===this.end_block[1]){
            block.style.backgroundColor = this.path;
            return true;
        }
        await new Promise(resolve =>{
            setTimeout(()=> resolve(), 100);
        });
        
        for(let i=0; i<this.directions.length; ++i){
             if(await this.recursiveDFS(r+this.directions[i][0], c+this.directions[i][1]) === true){
                this.blocks[r].childNodes[c].style.backgroundColor = this.path;
                await new Promise(resolve =>{
                    setTimeout(()=> resolve(), 100);
                });
                return true;
             }
        }
        await new Promise(resolve =>{
            setTimeout(()=> resolve(), 100);
        });
        this.blocks[r].childNodes[c].style.backgroundColor = this.visited;
        return false;
    }
    else{
        return false;
    }
}

Matrix.prototype.reset = async function() {
    if(this.start_block[0] !== undefined && this.blocks[this.start_block[0]].childNodes[this.start_block[1]].style.backgroundColor === this.explore ||   this.blocks[this.start_block[0]].childNodes[this.start_block[1]].style.backgroundColor === this.visited || this.start_block[0] !== undefined && this.blocks[this.start_block[0]].childNodes[this.start_block[1]].style.backgroundColor === this.explore ||   this.blocks[this.start_block[0]].childNodes[this.start_block[1]].style.backgroundColor === this.path){
        for(let i=0; i<this.blocks.length; ++i){
            for(let j=0; j<this.blocks[0].childElementCount; ++j){
                if(this.blocks[i].childNodes[j].style.backgroundColor !== this.wall && this.blocks[i].childNodes[j].style.backgroundColor!=="white"){
                    this.blocks[i].childNodes[j].style.backgroundColor = "white";
                }
                await new Promise(resolve =>{
                    setTimeout(()=> resolve(), 0);
                });
            }
        }
    }
}

Matrix.prototype.click = function(){
    let clickedBlock = arguments[0].path[0];
    let row_index = arguments[0].path[1].rowIndex;
    let col_index = arguments[0].path[0].cellIndex;
    
    clickedBlock.classList.remove("createWall");
    clickedBlock.classList.remove("breakWall");
    
    if(this.startNotMarked && this.blocks[row_index].childNodes[col_index].innerHTML !== "E"){
        clickedBlock.innerHTML = "S";
        this.start_block[0] = row_index;
        this.start_block[1] = col_index;
        this.startNotMarked = false;
    }
    else if(this.endNotMarked && this.blocks[row_index].childNodes[col_index].innerHTML !== "S"){
        clickedBlock.innerHTML = "E";
        this.end_block[0] = row_index;
        this.end_block[1] = col_index;
        this.endNotMarked = false;
    }
    else if(clickedBlock.innerHTML === "S"){
        clickedBlock.innerHTML = "";
        this.start_block[0] = undefined;
        this.start_block[1] = undefined;
        this.startNotMarked = true;
        
    }
    else if(clickedBlock.innerHTML === "E"){
        clickedBlock.innerHTML = "";
        this.end_block[0] = undefined;
        this.end_block[1] = undefined;
        this.endNotMarked = true;
    }
    else{
        this.buildWall(row_index, col_index);
    }        
}

Matrix.prototype.findPath = async function() {
    this.toggelBtns();
    let algo = document.querySelector("#algorithm").value;
    if(this.start_block[0] !== undefined && this.end_block[0] !== undefined){
        if(this.blocks[this.start_block[0]].childNodes[this.start_block[1]].style.backgroundColor === this.path || this.blocks[this.start_block[0]].childNodes[this.start_block[1]].style.backgroundColor === this.visited){
            this.reset();
        }
        if(algo === 'bfs'){
            await this.bfs();
        }
        else if(algo === 'dfs'){
            await this.recursiveDFS(1, 1);
        }
    }
    this.toggelBtns();
    console.log("done");
}

Matrix.prototype.bfs = async function(){
    let q = [];
    let visited = new Set();
    let backtrack = new Map();
    q.push(m.blocks[1].childNodes[1]);

    while(q.length !==0){
        let node = q.shift();
        if(node.innerHTML === 'E'){
            node.style.backgroundColor = this.path;
            while(node.innerHTML !== 'S'){
                await new Promise(resolve =>{
                    setTimeout(()=> resolve(), 100);
                });
                node = backtrack.get(node);
                node.style.backgroundColor = this.path;
            }
            break;
        }
        let row_index = node.parentElement.rowIndex;
        let col_index = node.cellIndex;    
    
        for(let i=0; i<this.directions.length; ++i){
            let check_row = this.directions[i][0] + row_index;
            let check_col = this.directions[i][1] + col_index;               
            if(check_row >= 0 && check_row < this.blocks.length && check_col >=0 && check_col < this.blocks[0].childElementCount){
                if(this.blocks[check_row].childNodes[check_col].style.backgroundColor !== this.wall && this.blocks[check_row].childNodes[check_col].style.backgroundColor !== this.explore && !visited.has(this.blocks[check_row].childNodes[check_col])){
                    q.push(this.blocks[check_row].childNodes[check_col]);
                    visited.add(this.blocks[check_row].childNodes[check_col]);
                    backtrack.set(this.blocks[check_row].childNodes[check_col], node);
                }
            }
        }
        node.style.backgroundColor = this.explore;
        await new Promise(resolve =>{
            setTimeout(()=> resolve(), 50);
        });
    }
}   

Matrix.prototype.makeWalls = async function(){
    for(let i=0; i<this.rows; i+=2){
        for(let j=0;  j<this.cols; ++j){
            this.blocks[i].childNodes[j].style.backgroundColor = this.wall;
            await new Promise(resolve =>{
                setTimeout(()=> resolve(), 0.5);
            });
        }
    }
    for(let i=0; i<this.cols; i+=2){
        for(let j=0;  j<this.rows; ++j){
            this.blocks[j].childNodes[i].style.backgroundColor = this.wall;
            await new Promise(resolve =>{
                setTimeout(()=> resolve(), 0.5);
            });
        }
    }
}


Matrix.prototype.recursiveBTMaze = async function(r, c, visited=new Set()){
    let count = 0;
    let seen = new Set();
    while(count < 4){
        let goto = Math.floor(Math.random() * (4 - 0) + 0);
        while(seen.has(goto)){
            goto = Math.floor(Math.random() * (4 - 0) + 0);
        }
        seen.add(goto);
        let check_row = r+this.directions2[goto][0];
        let check_col = c+this.directions2[goto][1];
        visited.add(this.blocks[r].childNodes[c]);
        
        if(check_row >=0 && check_row < this.rows && check_col>=0 && check_col < this.cols && !visited.has(this.blocks[check_row].childNodes[check_col])){
            if(goto === 0){
                this.blocks[r+1].childNodes[c].style.backgroundColor = "white";
            }
            else if(goto === 1){
                this.blocks[r].childNodes[c-1].style.backgroundColor = "white";
            }
            else if(goto === 2){
                this.blocks[r].childNodes[c+1].style.backgroundColor = "white";
            }
            else{
                this.blocks[r-1].childNodes[c].style.backgroundColor = "white";
            }
            await new Promise(resolve =>{
                setTimeout(()=> resolve(), 15);
            });
            await this.recursiveBTMaze(check_row, check_col, visited);
        }
        count++;   
    }
}

Matrix.prototype.toggelBtns = function(){
    document.querySelector("#start").disabled = !this.btns;
    document.querySelector("#reset").disabled = !this.btns;
    document.querySelector("#createMatrix").disabled = !this.btns;
    this.btns = !this.btns;
}

const m = new Matrix();
m.buildMatrix();
document.querySelector("#start").onclick = m.findPath.bind(m);
document.querySelector("#reset").onclick = m.reset.bind(m);
document.querySelector("#createMatrix").onclick = m.buildMatrix.bind(m);