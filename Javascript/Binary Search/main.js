class BinarySearch {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.count = 0;
        this.start = document.getElementById("start");
        this.end = document.getElementById("end");
        this.mid = document.getElementById("mid");
        this.btn = document.getElementById("btn");
        this.startArrow = document.getElementById("startArrow");
        this.width = screen.width - 80;
        this.eles = Math.floor(this.width / 40);
    }
    async createBlock(value) {
        let div = document.createElement("div");
        div.innerHTML = value;
        div.classList.add("block");

        let index = document.createElement("div");
        index.innerHTML = this.count;
        index.classList.add("index");
        div.appendChild(index);

        // div.style.transform = `translateX(${count * 40}px)`;
        window.requestAnimationFrame(function () {
            div.classList.add("insertAnimate");
        });

        canvas.appendChild(div);
        this.count++;
    }
    async generateArray() {
        let array = [];
        let num = 0;
        for (let i = 0; i < this.eles; i++) {
            num = Math.floor((Math.random() * 200) + 1);
            array.push(num);
        }
        array.sort((a, b) => a - b);
        for (let x = 0; x < array.length; ++x) {
            this.createBlock(array[x]);
            await new Promise(resolve => {
                setTimeout(() => resolve(), 100);
            });
        }
    }
    markStart(element) {
        let left = element.style.transform;
        // s.style.transform = left;
        // console.log(s.style.top);
    }
    async search() {
        let blocks = document.querySelectorAll(".block");
        let find = document.getElementById("value").value;
        let found = false;
        for (let x = 0; x < blocks.length; x++) {
            blocks[x].style.background = "rgb(17, 142, 192)";
        }

        if (find !== "") {
            btn.disabled = true;
            let target = parseInt(find);
            let i = 0;
            let j = blocks.length - 1;

            let process = document.getElementById("process");
            while (i <= j) {
                start.innerHTML = i;
                end.innerHTML = j;
                let m = Math.floor((i + j) / 2);
                mid.innerHTML = m;
                blocks[m].style.backgroundColor = "#ff595f";
                blocks[m].style.transform = "scale(1.2)";

                let mValue = parseInt(blocks[m].innerHTML);

                if (mValue === target) {
                    process.innerHTML = `${target} found at index ${m}`;
                    blocks[m].style.backgroundColor = "#68d47d";
                    found = true;
                    break;
                }

                else if (target < mValue) {
                    process.innerHTML = `${target} is less than ${mValue}`;
                    await new Promise(resolve => {
                        setTimeout(() => resolve(), 700);
                    });
                    for (let x = m; x <= j; x++) {
                        blocks[x].style.background = "#b8bfb9";
                        await new Promise(resolve => {
                            setTimeout(() => resolve(), 150);
                        });
                    }
                    blocks[m].style.transform = "scale(1)";
                    j = m - 1;
                }
                else {
                    process.innerHTML = `${target} is greater than ${mValue}`;
                    await new Promise(resolve => {
                        setTimeout(() => resolve(), 700);
                    });

                    for (let x = i; x <= m; x++) {
                        blocks[x].style.background = "#b8bfb9";
                        this.markStart(blocks[x]);
                        await new Promise(resolve => {
                            setTimeout(() => resolve(), 150);
                        });
                    }
                    blocks[m].style.transform = "scale(1)";
                    i = m + 1;
                }
            }

            if (!found) {
                process.innerHTML = `${target} does not exist`;
            }
            btn.disabled = false;
        }
    }
}
const bs = new BinarySearch();
bs.generateArray();