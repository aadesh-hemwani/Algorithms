def makeEqual(s, size):
    for i in range(size - len(s)):
        s = "0" + s
    return s


def karatsuba(x, y):
    x, y = str(x), str(y)

    if len(x) != len(y):
        if len(x) > len(y):
            y = makeEqual(y, len(x))
        else:
            x = makeEqual(x, len(y))

    if len(x) % 2 != 0:
        x = "0" + x
        y = "0" + y
    print(x, y)

    if len(str(x)) <= 2 and len(str(y)) <= 2:
        return int(x) * int(y)

    mid = len(x) // 2
    a = int(x[:mid])
    b = int(x[mid:])
    c = int(y[:mid])
    d = int(y[mid:])

    step1 = karatsuba(a, c)
    step2 = karatsuba(b, d)
    step3 = karatsuba((a + b), (c + d))
    step4 = step3 - step2 - step1

    return (step1 * 10 ** len(x)) + (step4 * 10 ** (len(x) / 2)) + step2


print(karatsuba(123, 12312345))
