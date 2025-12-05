
def solve(lines):
    print("*******************************")
    print("       Day6 - Part 1           \n")
    groups = []
    empty = ''
    totalAnswers = 0
    for line in lines:
        if(len(line) > 1):
            empty += line
            if(line == lines[len(lines) - 1]):
                empty = empty.replace("\n", "").rstrip("\n")
                if(empty != "\n"):
                    groups.append(empty)
                empty = ''

        else:
            empty = empty.replace("\n", "").rstrip("\n")
            if(empty != "\n"):
                groups.append(empty)
            empty = ''

    for group in groups:
        answers = []
        answerCount = 0
        for answer in group:
            if(answer not in answers):
                answers.append(answer)

        answerCount = len(answers)
        totalAnswers += answerCount

    print(f"Solution: {totalAnswers}")
    print("*******************************\n")


def solve2(lines):
    print("*******************************")
    print("       Day6 - Part 2           \n")
    groups = []
    empty = ''
    totalAnswers = 0
    for line in lines:
        if(len(line) > 1):
            empty += line + ":"
            if(line == lines[len(lines) - 1]):
                empty = empty.replace("\n", "").rstrip("\n")
                if(empty != "\n"):
                    groups.append(empty)
                empty = ''

        else:
            empty = empty.replace("\n", "").rstrip("\n")
            if(empty != "\n"):
                groups.append(empty)
            empty = ''

    for group in groups:
        answers = []
        answers = list(filter(None,  group.split(":")))
        yesVotes = []
        yesLetters = []
        for answer in answers:
            for letter in answer:
                if letter not in yesLetters:
                    yesVotes.append(1)
                    yesLetters.append(letter)
                else:
                    yesVotes[yesLetters.index(letter)] += 1

        for number in yesVotes:
            if number == len(answers):
                totalAnswers += 1

    print(f"Solution: {totalAnswers}")
    print("*******************************\n")
