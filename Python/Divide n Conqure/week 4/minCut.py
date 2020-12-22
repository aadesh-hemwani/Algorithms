import random

r = random.Random()
OG = []
ON = set()
#### Loading of the Graph from the file ####
for l in open( 'kargerMinCut.txt' ):
    x = l.strip().split()
    ON.add( x[0] )
    for b in x[1:]:
        OG.append( [x[0], b] )
        ON.add( b )
##########################################

ans = 300000
for t in range( len( ON ) ** 2 ):  ##### N^2.log N iterations
    G = OG
    N = set( ON )
    while len( N ) != 2:  ### continue until TWO nodes remain
        # print len(N)
        NG = []
        a, b = G[r.randint( 0, len( G ) - 1 )]  ### choose random edge.. call it a-b. We will rename b as a from hereon
        for c, d in G:
            if c == b: c = a  # renaming b to a
            if d == b: d = a  # renaming b to a
            if c == d: continue  # self edges ignored
            NG.append( [c, d] )  # other edges will be considered for next iteration
        N.remove( b )  # We can safely remove b, as b is collapsed into a
        G = NG

    ans = min( ans, len( G ) / 2 )
    print([t, len( G ) / 2, ans])