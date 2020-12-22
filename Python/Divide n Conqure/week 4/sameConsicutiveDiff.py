class Solution:

    def recurse(self, arr, K, N, s):
        if len( s ) == N:
            arr.append( s )
            return arr

        if int( s[-1] ) + K <= 9 and len(s) < N:
            a = s + str( int( s[-1] ) + K )
            self.recurse( arr, K, N, a )

        if int( s[-1] ) - K >= 0  and len(s) < N and  K != 0:
            a  = s + str( int( s[-1] ) - K )
            self.recurse( arr, K, N, a )

        return arr

    def numsSameConsecDiff(self, N: int, K: int):
        if N == 1:
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        ans = []
        for i in range( 9, 0, -1 ):
            s = str( i )
            temp = []
            for j in self.recurse( temp, K, N, s ):
                ans.append(int(j))
        return ans


if __name__ == "__main__":
    s = Solution()
    print(s.numsSameConsecDiff(9, 3))