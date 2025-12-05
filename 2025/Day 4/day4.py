import sys

args = sys.argv[1:]
test = 1
p1 = 0
p2 = 0

if len(args) > 0:
    if(args[0] == '-s'):
        test = 0
    if(args[0] == '-h'):
        print("Usage: python day4.py [-s|-h]")
        print("-s : use real input file")
        print("-h : display this help message")
        sys.exit(0) 

if(test):
    file_path = 'test.txt'
else:
    file_path = 'input.txt'

with open(file_path, 'r') as file:
    lines = file.readlines()
    lines = [list(line.strip().replace("\n", "")) for line in lines]





def check_accessibility(x,y, lines):
    if(lines[x][y] == '.' or lines[x][y] == 'x'):
        return False
    rolls = 0
    for i in range(-1,2):
        for j in range(-1,2):
            if(i == 0 and j == 0):
                continue
            nx = x + i
            ny = y + j
            if(nx < 0 or ny < 0 or nx >= len(lines) or ny >= len(lines[0])):
                continue
            if(lines[nx][ny] == '@'):
                rolls += 1
    if (rolls < 4):
        return True
    return False


removed = []
rounds = 1
#P2, remove until can't remove any
while(len(removed) > 0 or rounds == 1):
    removed = []
    for x in range(len(lines[0])):
        for y in range(len(lines)):
            if(check_accessibility(x, y, lines)):
                # Only first round for P1
                if(rounds == 1):
                    p1 += 1

                removed.append((x,y))
                p2 += 1



    rounds += 1
    for (x,y) in removed:
        lines[x][y] = 'x'

    if(len(removed)):
        print(f"Round {rounds}, removed: {len(removed)}, total: {p2}")
    else:
        print(f"Round {rounds}, can't remove any more... Stopping.")




print()
print("P1", p1)
print("P2", p2)
