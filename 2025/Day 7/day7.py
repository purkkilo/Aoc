import sys
from functools import cache

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
    lines = [line.strip() for line in lines]

tachyon = lines[0].index("S")
lines.pop(0)

beams = []
beams.append(tachyon)
splits = []

for line in lines:
    # Remove beams under the splits
    for split in splits:
        if split in beams:
            beams.remove(split)
    splits = []
    for beam in beams:
        if(line[beam] == "^"):
            splits.append(beam)
            new_beam1 = beam-1
            new_beam2 = beam+1

            if((new_beam1 >= 0)):
                if(new_beam1 not in beams):
                    beams.append(new_beam1)

            if(new_beam2 <= len(line)-1):
                if(new_beam2 not in beams):
                    beams.append(new_beam2)

            p1 += 1

@cache
def count_paths(row, column):
    if row+1 == len(lines):
        return 1
    if(lines[row+1][column] == "^"):
        # If splitter, check 2 paths
        return count_paths(row+1, column-1) + count_paths(row+1, column+1)
    else:
        # Only one path, straight down
        return count_paths(row+1, column)


p2 = count_paths(0, tachyon)

print()
print("P1", p1)
print("P2", p2)
