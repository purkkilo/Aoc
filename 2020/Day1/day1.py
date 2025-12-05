def solve(lines):
    print("*******************************")
    print("       Day1 - Part 1           \n")
    numbers = []
    for x in lines:
        numbers.append(int(x))

    answerFound = False
    output = "No answer found"
    for x in numbers:
        if (not answerFound):
            for y in numbers:
                if(x + y == 2020):
                    answer = x * y
                    output = f"Solution is: {answer}"
                    answerFound = True
                    break
        else:
            break
    print(output)
    print("*******************************\n")


def solve2(lines):
    print("*******************************")
    print("       Day1 - Part 2           \n")
    numbers = []
    for x in lines:
        numbers.append(int(x))

    answerFound = False
    output = "No answer found"
    for x in numbers:
        if (not answerFound):
            for y in numbers:
                for z in numbers:
                    if(x + y + z == 2020):
                        answer = x * y * z
                        output = f"Solution is: {answer}"
                        answerFound = True
                        break
        else:
            break
    print(output)
    print("*******************************\n")
