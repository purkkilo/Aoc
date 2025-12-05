def solve(lines):
    print("*******************************")
    print("       Day3 - Part 1           \n")
    column = 0
    counter = 0
    trees = 0
    clearSpots = 0

    for line in lines:
        # Disregard first line
        if(counter > 0):
            column += 3
            if(column >= 31):
                column -= 31

            if(line[column] == "."):
                clearSpots += 1
            else:
                trees += 1

        counter += 1

    print(f"Solution: Found {trees} trees (#)")
    print("*******************************\n")


def solve2(lines):
    print("*******************************")
    print("       Day3 - Part 2           \n")
    steps = [
        {"right": 1, "down": 1},
        {"right": 3, "down": 1},
        {"right": 5, "down": 1},
        {"right": 7, "down": 1},
        {"right": 1, "down": 2}
    ]
    totalTrees = 0
    totalClearSpots = 0

    for step in steps:
        column = 0
        trees = 0
        clearSpots = 0
        trajectory = range(step['down'], len(lines), step['down'])
        for i in trajectory:
            line = lines[i]
            column += step['right']
            if(column >= 31):
                column -= 31

            if(line[column] == "."):
                clearSpots += 1
            else:
                trees += 1

        if(totalClearSpots == 0):
            totalClearSpots = clearSpots
        else:
            totalClearSpots *= clearSpots

        if(totalTrees == 0):
            totalTrees = trees
        else:
            totalTrees *= trees

    print(
        f"Solution: Found {totalTrees} trees (#)")
    print("*******************************\n")
