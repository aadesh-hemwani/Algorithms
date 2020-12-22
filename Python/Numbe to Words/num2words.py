words = {
    1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine",
    11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fifteen",
    16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen",
    10: "ten", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty",
    60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety",
    100: "hundred"
}

level = {
        1: "thousand", 2: "million", 3: "billion", 4: "trillion", 5: "quadrillion",
        6: "quintillion", 7: "sextillion", 8: "septillion", 9: "octillion",
        10: "nonillion", 11: "decillion"
}


def process(num, idx, ans):
    if idx < 0:
        return ans

    process(num, idx - 1, ans)

    pointer = len(num) - idx - 1
    if pointer % 3 == 2:
        if int(num[idx]) in words:
            ans.append(words[int(num[idx])])
            ans.append("hundred")

    elif pointer % 3 == 1:
        temp = int(num[idx] + "0")
        if temp in words:
            ans.append(words[temp])

    elif pointer % 3 == 0:
        if num[idx] != "0" and ans and ans[-1] == "ten":
            ans.pop()
            temp = int("1" + num[idx])
            if temp in words:
                ans.append(words[temp])
        else:
            if int(num[idx]) in words:
                ans.append(words[int(num[idx])])

        if pointer // 3 in level and ans[-1] not in level.values():
            ans.append(level[pointer // 3])
    return ans


def num2words(num):
    n = str(num)
    in_words_list = process(n, len(n)-1, [])
    return " ".join(in_words_list)


if __name__ == "__main__":
    number = int(input("enter number: "))
    output = num2words(number)
    if output == "":
        print("a big fat goose Egg")
    print(output.title())
