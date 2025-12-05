test = 1
if(test):
    file_path = 'test.txt'
else:
    file_path = 'input.txt'

with open(file_path, 'r') as file:
    lines = file.readlines()
    lines = [line.strip() for line in lines]


current = 50
p1 = 0
p2 = 0
for line in lines:
    direction, value = line[0], int(line[1:])
    print(current, direction, value)
    # Rotate step by step
    # Works because only small numbers
    for _ in range(value):
        if direction == 'L':
            current = (current-1+100)%100
        else:
            current = (current+1)%100
        print(current)
        if(current == 0):
            p2 +=1
    
    # only for part 1, only add if ended on 0
    if(current == 0):
        p1 +=1

print("Part 1:", p1)
print("Part 2:", p2)




