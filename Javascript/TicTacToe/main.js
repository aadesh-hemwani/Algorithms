class TicTacToe {
	constructor() {
		this.reset = document.querySelector(".reset");
		this.msg = document.querySelector(".msg");
		this.dwin = document.querySelector(".Dwin");
		this.xwin = document.querySelector(".Xwin");
		this.owin = document.querySelector(".Owin");
		this.wins = { X: 0, O: 0, D: 0 };
		this.human = "X";
		this.ai = "O";
		this.XColor = "#3887D0";
		this.OColor = "#67CADA";
		this.lookUp = { X: 1, O: -1, draw: 0 };
		this.pos = [
			[
				document.querySelector(".one"),
				document.querySelector(".two"),
				document.querySelector(".three"),
			],
			[
				document.querySelector(".four"),
				document.querySelector(".five"),
				document.querySelector(".six"),
			],
			[
				document.querySelector(".seven"),
				document.querySelector(".eight"),
				document.querySelector(".nine"),
			],
		];
	}
	init() {
		this.reset.onclick = () => {
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					this.pos[i][j].innerHTML = "";
				}
			}
			this.count = 1;
			this.setOnClick();
			this.msg.innerHTML = "";
		};
		this.setOnClick();
	}
	setOnClick = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.pos[i][j].onclick = () => this.change(this.pos[i][j]);
			}
		}
	};
	removeOnClick = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.pos[i][j].onclick = "";
			}
		}
	};

	change(btn) {
		if (btn.innerHTML === "") {
			btn.innerHTML = this.human;
			btn.style.color = this.XColor;
			const result = this.checkWinner();
			if (result[0]) {
				if (result[1] === "draw") {
					this.msg.innerHTML = result[1];
					this.dwin.innerHTML = `${++this.wins.D} Draws`;
				} else {
					this.msg.innerHTML = result[1] + " wins";

					if (result[1] === "X") {
						this.xwin.innerHTML = `${++this.wins.X} Wins`;
					} else {
						this.owin.innerHTML = `${++this.wins.O} Wins`;
					}
				}
				this.removeOnClick();
			} else {
				this.aiMove();
			}
		}
	}
	checkWinner() {
		// horizontal
		for (let i = 0; i < 3; i++) {
			if (
				this.pos[i][0].innerHTML !== "" &&
				this.pos[i][0].innerHTML === this.pos[i][1].innerHTML &&
				this.pos[i][1].innerHTML === this.pos[i][2].innerHTML
			) {
				return [true, this.pos[i][0].innerHTML];
			}
		}

		// vertical
		for (let i = 0; i < 3; i++) {
			if (
				this.pos[0][i].innerHTML !== "" &&
				this.pos[0][i].innerHTML === this.pos[1][i].innerHTML &&
				this.pos[1][i].innerHTML === this.pos[2][i].innerHTML
			) {
				return [true, this.pos[0][i].innerHTML];
			}
		}

		// diagonal
		if (
			this.pos[0][0].innerHTML === this.pos[1][1].innerHTML &&
			this.pos[1][1].innerHTML === this.pos[2][2].innerHTML &&
			this.pos[0][0].innerHTML !== ""
		) {
			return [true, this.pos[0][0].innerHTML];
		}
		if (
			this.pos[0][2].innerHTML === this.pos[1][1].innerHTML &&
			this.pos[1][1].innerHTML === this.pos[2][0].innerHTML &&
			this.pos[0][2].innerHTML !== ""
		) {
			return [true, this.pos[0][2].innerHTML];
		}

		// draw
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.pos[i][j].innerHTML === "") {
					return [false, ""];
				}
			}
		}
		return [true, "draw"];
	}

	aiMove() {
		let bestScore = Infinity;
		let bestMove;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.pos[i][j].innerHTML === "") {
					this.pos[i][j].innerHTML = this.ai;
					let score = this.minimax(0, true);
					this.pos[i][j].innerHTML = "";
					if (score < bestScore) {
						bestScore = score;
						bestMove = { i, j };
					}
				}
			}
		}
		this.pos[bestMove.i][bestMove.j].innerHTML = this.ai;
		this.pos[bestMove.i][bestMove.j].style.color = this.OColor;
		let result = this.checkWinner();
		if (result[0]) {
			if (result[1] === "draw") {
				this.msg.innerHTML = result[1];
				this.dwin.innerHTML = `${++this.wins.D} Draws`;
			} else {
				this.msg.innerHTML = result[1] + " wins";
				if (result[1] === "X") this.xwin.innerHTML = `${++this.wins.X} Wins`;
				else this.owin.innerHTML = `${++this.wins.O} Wins`;
			}
			this.removeOnClick();
		}
	}
	minimax(depth, isMaximizing) {
		let result = this.checkWinner();
		if (result[0] === true) {
			return this.lookUp[result[1]];
		}
		if (isMaximizing) {
			let bestScore = -Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.pos[i][j].innerHTML === "") {
						this.pos[i][j].innerHTML = this.human;
						let score = this.minimax(depth + 1, false);
						this.pos[i][j].innerHTML = "";
						bestScore = Math.max(score, bestScore);
					}
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					if (this.pos[i][j].innerHTML === "") {
						this.pos[i][j].innerHTML = this.ai;
						let score = this.minimax(depth + 1, true);
						this.pos[i][j].innerHTML = "";
						bestScore = Math.min(score, bestScore);
					}
				}
			}
			return bestScore;
		}
	}
}

const ttt = new TicTacToe();
ttt.init();
