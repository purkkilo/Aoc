import sys
from itertools import combinations

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



def any_ID_overlap(IDs):
    # For each possible pair of lists in freshIDs
    for item1, item2 in combinations(IDs, 2):
        min1, max1 = item1
        min2, max2 = item2
        # No overlap, ignore
        if min1 > max2 or max1 < min2:
            continue
        # Overlap, so return
        else:
            return item1, item2

    return None



empty_line = lines.index("")
fresh_IDs = [[int(x) for x in line.split("-")] for line in lines[:empty_line]]
IDs = [int(id) for id in lines[empty_line + 1:]]

for id in IDs:
    fresh = False
    for (lower, higher) in fresh_IDs:
        if(lower <= id <= higher):
                p1 += 1
                fresh = True
                break

# Go through the list until no overlaps
while True:
    overlap = any_ID_overlap(fresh_IDs)
    if not overlap:
        break
    else:
        item1, item2 = overlap
        # Remove the items from the main list
        fresh_IDs.remove(item1)
        fresh_IDs.remove(item2)
        item_values = item1 + item2
        fresh_IDs.append([min(item_values),max(item_values)])

for (lower, higher) in fresh_IDs:
    p2 += higher-lower+1




print()
print("P1", p1)
print("P2", p2)
