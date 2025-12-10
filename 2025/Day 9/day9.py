import sys
import shapely

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

def rect_area(c1,c2):
    height = abs(c1[0] - c2[0])+1
    width = abs(c1[1] - c2[1])+1
    return height * width

with open(file_path, 'r') as file:
    lines = file.readlines()
    lines = [[int(coord) for coord in line.strip().split(",")] for line in lines]

# This was a struggle in python, but shapely is a lovely library I learned from:
# https://github.com/jonathanpaulson/AdventOfCode/blob/master/2025/9.py
polygon = shapely.Polygon(lines)
shapely.prepare(polygon)

for c1 in lines:
    for c2 in lines:
        if(c1 == c2): continue
        corners = [c1,[c1[0], c2[1]], c2, [c2[0], c1[1]]]
        area = rect_area(c1,c2)
        # P1, just check the area
        if(area > p1):
            p1 = area
        # P2, check if the rectange is within the shape (red/green tiles)
        sub_rect = shapely.Polygon(corners)
        if polygon.contains(sub_rect) and area > p2:
            p2 = area

print()
print("P1", p1)
print("P2", p2)
