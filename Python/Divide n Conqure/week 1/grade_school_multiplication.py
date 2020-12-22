def multiply(x, y):
    x, y = str(x), str(y)
    ans = []

    for i in range(len(y)-1, -1, -1):
        level = ""
        carry = ""
        for j in range(len(x) - 1, -1, -1):
            temp = int(y[i]) * int(x[j])

            if len(carry) > 0:
                temp += int(carry)
            if len(str(temp)) >= 1:
                carry = str(temp)[:-1]
            level += str(temp)[-1]

        if len(carry) > 0:
            level += carry
        ans.append(int(level[::-1]))

    addition = 0
    for i in range(1, len(ans)):
        x = list(str(ans[i]))
        for j in range(i):
            x.append("0")
        ans[i] = int("".join(x))

    for i in ans:
        addition += i
    return addition


print(multiply(3141592653589793238462643383279502884197169399375105820974944592,
               2718281828459045235360287471352662497757247093699959574966967627))
