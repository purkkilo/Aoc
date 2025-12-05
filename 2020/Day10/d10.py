with open("input.txt") as f:
    numbers = [0] + sorted([int(x) for x in f.readlines()])

placeholders = [1] + [0 for x in range(len(numbers) - 1)]
for x in range(len(numbers)):
    for y in range(1, 4):
        if numbers[x] + y in numbers:
            placeholders[numbers.index(numbers[x] + y)] += placeholders[x]

print(placeholders[-1])
