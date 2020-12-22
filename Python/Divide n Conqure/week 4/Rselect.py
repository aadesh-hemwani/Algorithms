class Rselect:
    def partition(self, arr, low, high):
        p = arr[low]
        i = low + 1

        for j in range( low + 1, high ):
            if arr[j] < p:
                if arr[i] != arr[j]:
                    arr[i], arr[j] = arr[j], arr[i]
                i += 1

        arr[low], arr[i - 1] = arr[i - 1], arr[low]
        return i - 1


    def ithOrder(self, arr, i, low, high):
        if low < high:
            part = self.partition(arr, low, high)

            if part+1 == i:
                return arr[part]
            elif part < i:
                return self.ithOrder(arr, i, part+1, high)
            else:
                return self.ithOrder(arr, i, low, part)

if __name__ == "__main__":
    array = [16, 48, 2, 8, 96, 1]

    print(sorted(array))

    rs = Rselect()
    ith = 1
    ans = rs.ithOrder(array, ith, 0, len(array))
    print(ans)