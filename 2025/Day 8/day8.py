import sys
import math

args = sys.argv[1:]
test = 1
p1 = 1
p2 = 0
connections = 10

if len(args) > 0:
    if(args[0] == '-s'):
        test = 0
        connections = 1000
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
    lines = [[int(coord) for coord in line.strip().split(",")] for line in lines]

def find_distances(coords):
    distances = {}
    for idx, c1 in enumerate(coords):
        for idx2 in range(idx + 1, len(coords)):
            c2 = coords[idx2]
            dist = math.dist(c1, c2)
            # idx < idx2 always
            distances[(idx, idx2)] = dist

    return dict(sorted(distances.items(), key=lambda item: item[1]))

circuits = []
distances = find_distances(lines)
counter = 0
c1 = []
c2 = []

for k, ((idx1, idx2), dist) in enumerate(distances.items()):
    
    # P1
    if k == connections:
        circuits.sort(key=lambda x: len(x), reverse=True)
        for i in range(0,3):
            p1 *= len(circuits[i])
    
    # P2
    # Go until one big circuit
    if(len(circuits) == 1 and len(circuits[0]) == len(lines)):
        p2 = c1[0] * c2[0]
        break

    c1 = lines[idx1]
    c2 = lines[idx2]
    circuit_with_c1 = None
    circuit_with_c2 = None

    # Find circuits (if any) that already contain c1 and c2
    for circuit in circuits:
        if c1 in circuit:
            circuit_with_c1 = circuit
        if c2 in circuit:
            circuit_with_c2 = circuit

    if circuit_with_c1 is None and circuit_with_c2 is None:
        circuits.append([c1, c2])
    elif circuit_with_c1 is not None and circuit_with_c2 is None:
        circuit_with_c1.append(c2)
    elif circuit_with_c1 is None and circuit_with_c2 is not None:
        circuit_with_c2.append(c1)
    else:
        # if they are in different circuits, merge them
        if circuit_with_c1 is not circuit_with_c2:
            circuit_with_c1.extend(circuit_with_c2)
            circuits.remove(circuit_with_c2)

print()
print("P1", p1)
print("P2", p2)
