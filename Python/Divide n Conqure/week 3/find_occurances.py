import random


def findOccurances(array, target):
    if len(array) == 0:  return 0

    start = 0
    end = len( array ) - 1
    index = -1

    while start <= end:
        mid = (start + end) // 2
        if array[mid] == target:
            index = mid
            break
        elif array[mid] > target:
            end = mid - 1
        else:
            start = mid + 1

    if index == -1: return 0

    count = 1
    i = j = index

    if array[index] == target:
        if index != 0 and array[index - 1] == target:
            while i > start and array[i - 1] == target:
                count += 1
                i -= 1
        if index != len( array ) - 1 and array[index + 1] == target:
            while j < end and array[j + 1] == target:
                count += 1
                j += 1
    return count


def findOccurances2(array, target):
    dict = {}
    for r in array:
        if r in dict:
            dict[r]+=1
        else:
            dict[r] = 1

    if target in dict:
        return dict[target]
    else: return 0


array = [random.randint(1, 100) for i in range(80)]
array.sort()
print(array)
print( findOccurances2( array, 44 ) )
