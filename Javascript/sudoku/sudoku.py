import math, random

cells = []

for i in range(9):
    inner = [0] * 9
    cells.append(inner)

def fillRandom():
    visited = set()
    while len(visited) != 13:
        row = math.floor(random.random() * 9)
        col = math.floor(random.random() * 9)
        num = math.floor(random.random() * 9)+1
        if validNum(num, row, col) and (row, col) not in visited:
            cells[row][col] = num
            visited.add((row, col))

def validNum(num, row, col):
    # check row 
    for i in range(9):
        val = cells[row][i]
        if num == val and i != col:
            return False
    
    # check column
    for i in range(9):
        val = cells[i][col]
        if num == val and i != row:
            return False
    

    # check sub-matrix
    x = (row//3)
    y = (col//3)
    
    for i in range(x*3, x*3+3):
        for j in range(y*3, y*3+3):
            val = cells[i][j]
            if num == val and i != row and j != col:
                return False
            
    return True


def solveSudoku(row, col):
    if row == 8 and col == 9:
        return True

    if col == 9:
        row+=1
        col = 0

    if cells[row][col] == 0:
        for i in range(1, 10):
            if validNum(i, row, col):   
                cells[row][col] = i
                if solveSudoku(row, col+1):
                    return True
                
                cells[row][col] = 0
    else:
        return solveSudoku(row, col + 1)
    
    return False


fillRandom()
print(solveSudoku(0, 0))
for i in range(9):
    for j in range(9):
        print(cells[i][j], end=", ")
    print()