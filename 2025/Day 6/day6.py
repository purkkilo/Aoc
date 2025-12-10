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
    f = file.read()
    br = 4
    problems = [list(row) for row in f.splitlines()]

columns = len(problems[0])
rows = len(problems)
starting_column = 0
op = ""
for c in range(columns+1):
    is_blank = True
    if(c < columns):
        for r in range(rows):
            if problems[r][c] != " ":
                if(problems[r][c] == "+" or problems[r][c] == "*"):
                    op = problems[r][c]
                is_blank = False

    # If all in the same column are blanks = space between columns
    if is_blank:
        result = 0 if op =="+" else 1
        cells = {}
        for r in range(rows-1):
            cell = "".join(problems[r][starting_column:c])
            n = cell.strip()
            
            if(op == "+"):
                result += int(n)
            else:
                result *= int(n)

            # Construct the numbers from right-to-left for p2
            cell = cell[::-1]
            for i in range(len(cell)):
                ch = cell[i]
                if(ch != " "):
                    cells[i] = cells.get(i, "") + ch
        
        p1 += result 

        #P2
        p2_result = 0 if op =="+" else 1
        for p2_cell in cells.values():
            if(op == "+"):
                p2_result += int(p2_cell)
            else:
                p2_result *= int(p2_cell)

        p2 += p2_result

        starting_column = c+1


print()
print("P1", p1)
print("P2", p2)
