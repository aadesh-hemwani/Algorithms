file1 = open( 'array.txt', 'r' )
Lines = file1.readlines()
array = []
count = 0
for line in Lines:
    array.append(int(line))
print(array)