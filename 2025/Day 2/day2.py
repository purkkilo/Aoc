import sys

test = 0
if(test):
    file_path = 'test.txt'
else:
    file_path = 'input.txt'

with open(file_path, 'r') as file:
    line = file.readline()
    lines = line.strip().split(",")

p1 = 0
p2 = 0

for l in lines:
    sys.stdout.write(
        f"\rProcessing ids... ({lines.index(l)+1}/{len(lines)}) | id range: {l}{' ' * 20}"
    )
    sys.stdout.flush()
    firstID, lastID = l.split("-")
    for i in range(int(firstID), int(lastID) + 1):
        id = str(i)
        # Check for repeating patterns like "11", "1010", "446446", "222222"
        # Split in half and compare halves to the original id
        half = len(id)//2
        firstHalf = id[:half]
        secondHalf = id[half:]
        if(firstHalf == secondHalf):
            p1 += i

        #p2
        # Check for patterns that are repeated at least twice
        matchCount = 0
        for size in range(1, half + 1):
            # Pattern found, no need to check again
            if(matchCount >= 2):
                break
            pattern = id[:size]
            # "Travel" through the id in chunks and check if they match the pattern
            for j in range(0, len(id), size):
                chunk = id[j:j+size]
                if(chunk == pattern):
                    matchCount += 1
                else:
                    matchCount = 0
                    break
        
        if(matchCount >= 2):
            p2 += i

print()
print("P1", p1)
print("P2", p2)
