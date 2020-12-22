import random


def mergeSort(array):
    if len( array ) == 1:
        return array

    mid = len( array ) // 2
    left = array[:mid]
    right = array[mid:]
    print( left, right )
    mergeSort(left)
    mergeSort(right)

    i = j = k = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            array[k] = left[i]
            i+=1
        else:
            array[k] = right[j]
            j += 1
        k += 1

    while i < len(left):
        array[k] = left[i]
        i+=1
        k+=1
    while j < len( right ):
        array[k] = right[j]
        j += 1
        k += 1

    return array


if __name__ == "__main__":

   # array = [random.randint( 1, 10000 ) for i in range( 2000 )]
    array = [1, 3, 4, 2, 5, 6]
    print( array )
    array = mergeSort( array )
    print( array )
