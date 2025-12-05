
def solve(lines):
    print("*******************************")
    print("       Day5 - Part 1           \n")
    rows = 127
    columns = 7
    seatIds = []
    # Part 1
    for line in lines:
        rowString = line[:7]
        lowerRowLimit = 0
        upperRowLimit = rows
        row = 0
        column = 0
        letterCount = 0
        for letter in rowString:
            if(letter == 'B'):
                lowerRowLimit = round((lowerRowLimit + upperRowLimit)/2)
                if(letterCount == 6):
                    row = upperRowLimit
            else:
                upperRowLimit = int((lowerRowLimit + upperRowLimit)/2)
                if(letterCount == 6):
                    row = lowerRowLimit

            letterCount += 1

        lowerColumnLimit = 0
        upperColumnLimit = columns
        letterCount = 0
        columnString = line[7:-1]
        for letter in columnString:
            if(letter == 'R'):
                lowerColumnLimit = round(
                    (lowerColumnLimit + upperColumnLimit)/2)
                if(letterCount == 2):
                    column = upperColumnLimit
            else:
                upperColumnLimit = int((lowerColumnLimit + upperColumnLimit)/2)
                if(letterCount == 2):
                    column = lowerColumnLimit
            letterCount += 1

        seatId = row * 8 + column
        seatIds.append(seatId)

    # Part 2
    myId = -1
    iterate = range(0, max(seatIds))
    for number in iterate:
        lowerId = (number-1) in seatIds
        higherId = (number+1) in seatIds
        if((number not in seatIds) and lowerId and higherId):
            myId = number

    print(f"Highest Id: {max(seatIds)}")
    print("*******************************\n")
    print("*******************************")
    print("       Day5 - Part 2           \n")
    print(f"My Id: {myId}")
    print("*******************************\n")
