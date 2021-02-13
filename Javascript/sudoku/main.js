class Sudoku {
    constructor() {
        this.canvas = document.querySelector(".canvas");
        this.startBtn = document.querySelector(".start");
        this.resetBtn = document.querySelector(".reset");
        this.visulatizeToggle = document.querySelector(".visualize");
        this.newBoard = document.querySelector(".newBoard");
        this.visualize = true;
        this.cells = [];
        this.fixedNumColor = `rgb(220, 220, 220)`;
        this.isRunning = false;
        this.btns = false;
        this.N = 9;
    }
    init() {
        this.resetBtn.onclick = this.reset.bind(this);
        this.startBtn.onclick = this.startSolving.bind(this);
        this.newBoard.onclick = this.createMatrix.bind(this);
        
        this.visulatizeToggle.onclick = (()=>{
            this.visualize = !this.visualize;
            if(this.visualize){
                this.visulatizeToggle.value = "Visualization On";
                this.visulatizeToggle.style.backgroundColor = "rgb(67, 182, 111)";                
            }
            else{
                this.visulatizeToggle.value = "Visualization Off";
                this.visulatizeToggle.style.backgroundColor = "rgb(255, 12, 90)";
            }
        }).bind(this);
        this.createMatrix();
    }

    toggelBtns(){
        if(!this.btns){
            this.startBtn.style.backgroundColor = "gray";
            this.resetBtn.style.backgroundColor = "gray";
            this.newBoard.style.backgroundColor = "gray";
            this.canvas.style.cursor = "wait"
        }
        else{
            this.startBtn.style.backgroundColor = "rgb(67, 182, 111)"
            this.resetBtn.style.backgroundColor = "rgb(66, 130, 242)";
            this.newBoard.style.backgroundColor = "rgb(66, 130, 242)";            
            this.canvas.style.cursor = "default"
        }
        this.startBtn.disabled = !this.btns;
        this.resetBtn.disabled = !this.btns;
        this.visulatizeToggle.disabled = !this.btns;
        this.newBoard.disabled = !this.btns;
        this.btns = !this.btns;
    }

    async startSolving() {
        this.toggelBtns();
        if(!this.isRunning){
            this.isRunning = true;
            if(! await this.solveSudoku(0, 0)){
                alert("No Solution For Current Board !")
            }
            this.isRunning = false;
        }
        this.toggelBtns();
    }

    makeSubMatrices() {
        for (let i = 0; i < this.N; ++i) {
            this.cells[i].childNodes[2].style.borderRight = `2.5px solid black`;
        }
        for (let i = 0; i < this.N; ++i) {
            this.cells[i].childNodes[5].style.borderRight = `2.5px solid black`;
        }
        for (let i = 0; i < this.N; ++i) {
            this.cells[2].childNodes[i].style.borderBottom = `2.5px solid black`;
        }
        for (let i = 0; i < this.N; ++i) {
            this.cells[5].childNodes[i].style.borderBottom = `2.5px solid black`;
        }

    }

    reset() {
        if(!this.isRunning){
            for (let i = 0; i < this.N; i++) {
                for (let j = 0; j < this.N; ++j) {
                    if (this.cells[i].childNodes[j].style.backgroundColor !== this.fixedNumColor) {
                        this.cells[i].childNodes[j].innerHTML = "";
                    }
                }
            }
        }
    }

    createMatrix() {
        while (this.canvas.firstChild) {
            this.canvas.removeChild(this.canvas.firstChild);
        }
        for (let i = 0; i < this.N; i++) {
            let tr = document.createElement("tr");
            tr.classList.add("row");
            for (let j = 0; j < this.N; j++) {
                let td = document.createElement("td");
                td.classList.add("cell");
                tr.appendChild(td);
            }
            this.canvas.appendChild(tr);
        }
        this.cells = document.querySelectorAll(".row");
        this.makeSubMatrices();
        this.fillRandom();

    }

    validNum(num, row, col) {
        // check row 
        for (let i = 0; i < this.N; ++i) {
            let val = parseInt(this.cells[row].childNodes[i].innerHTML);
            if (num === val && i !== col) {
                return false;
            }
        }

        // check column
        for (let i = 0; i < this.N; ++i) {
            let val = parseInt(this.cells[i].childNodes[col].innerHTML);
            if (num === val && i !== row) {
                return false;
            }
        }

        // check sub-matrix
        let x = Math.floor(row / 3);
        let y = Math.floor(col / 3);

        for (let i = x * 3; i < x * 3 + 3; i++) {
            for (let j = y * 3; j < y * 3 + 3; j++) {
                let val = parseInt(this.cells[i].childNodes[j].innerHTML);
                if (num === val && i !== row && j !== col) {
                    return false;
                }
            }
        }
        return true;
    }

    fillRandom() {
        let visited = new Set();
        while (visited.size !== 15) {
            let row = Math.floor((Math.random() * this.N - 1) + 1);
            let col = Math.floor((Math.random() * this.N - 1) + 1);
            let num = Math.floor((Math.random() * this.N - 1) + 2);
            if (this.validNum(num, row, col) && !(visited.has(this.cells[row].childNodes[col]))) {
                this.cells[row].childNodes[col].innerHTML = `${num}`;
                visited.add(this.cells[row].childNodes[col]);
                this.cells[row].childNodes[col].style.backgroundColor = this.fixedNumColor;
            }
        }
    }

    async delay(time) {
        return await new Promise(resolve => {
            setTimeout(() => resolve(), time);
        });
    }

    async solveSudoku(row, col) {
        if (row === this.N-1 && col === this.N)
            return true;
        if (col === this.N) {
            row++;
            col = 0;
        }
        this.visualize ? await this.delay(25) : null;
        if (this.cells[row].childNodes[col].innerHTML === "") {
            for (let i = 1; i <= this.N; ++i) {
                if (this.validNum(i, row, col)) {
                    this.cells[row].childNodes[col].style.backgroundColor = `rgba(94, 150, 255, 0.3)`;
                    this.cells[row].childNodes[col].innerHTML = `${i}`;
                    if (await this.solveSudoku(row, col + 1)) {
                        this.visualize ? await this.delay(20) : null;
                        this.cells[row].childNodes[col].style.backgroundColor = "white";
                        return true;
                    }
                    this.cells[row].childNodes[col].innerHTML = "";
                }
            }
            this.cells[row].childNodes[col].style.backgroundColor = "white";
        }
        else {
            return await this.solveSudoku(row, col + 1);
        }
        return false;
    }
} 

const s = new Sudoku();
s.init();