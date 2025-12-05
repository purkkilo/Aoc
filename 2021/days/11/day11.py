test = "test.txt"
infile = "input.txt"
isTest = 0
if(isTest):
    infile = test

octopus = []
for line in open(infile):
    octopus.append([int(x) for x in line.strip()])


rowLength = len(octopus)
columnLength = len(octopus[0])

solution = 0
steps = 0


def flash(y,x):
    global solution
    solution += 1
    octopus[y][x] = -1
    neighbours = [-1,0,1]
    for row in neighbours:
        for col in neighbours:
            yy = y+row
            xx = x+col
            if 0<=yy<rowLength and 0<=xx<columnLength and octopus[yy][xx]!=-1:
                octopus[yy][xx] += 1
                if octopus[yy][xx] >= 10:
                    flash(yy,xx)

while True:
    steps += 1
    for y in range(rowLength):
        for x in range(columnLength):
            octopus[y][x] += 1
    for y in range(rowLength):
        for x in range(columnLength):
            if octopus[y][x] == 10:
                flash(y,x)
    allFlashed = True
    for y in range(rowLength):
        for x in range(columnLength):
            if octopus[y][x] == -1:
                octopus[y][x] = 0
            else:
                allFlashed = False
    if steps == 100:
        print("Part 1:", solution)
        # break 
    if allFlashed:
        print("Part 2:", steps)
        break





