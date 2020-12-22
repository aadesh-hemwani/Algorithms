import heapq
import sys

filename = "Median.txt"
X = [int(l) for l in open(filename)]
H_low = []
H_high = []

sum = 0
for x_i in X:
    if len(H_low) > 0:
        if x_i > -H_low[0]:
            heapq.heappush(H_high, x_i)
        else:
            heapq.heappush(H_low, -x_i)
    else:
        heapq.heappush(H_low, -x_i)

    if len(H_low) > len(H_high) + 1:
        heapq.heappush(H_high, -(heapq.heappop(H_low)))
    elif len(H_high) > len(H_low):
        heapq.heappush(H_low, -(heapq.heappop(H_high)))

    sum += -H_low[0]

print(sum % 10000)