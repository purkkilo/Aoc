test = 0
if(test):
    file_path = 'test.txt'
else:
    file_path = 'input.txt'

with open(file_path, 'r') as file:
    lines = file.readlines()
    banks = [line.strip() for line in lines]

def find_largest_battery(batteries, numbers_left, idx):
    new_idx = 0
    largest = 0
    # Search subset find largest battery
    for i in range(idx,len(batteries)-numbers_left+1):
        if batteries[i] > largest:
            largest = batteries[i]
            new_idx = i + 1
            
    return [new_idx, largest]

p1 = 0
p2 = 0

for bank in banks:
    batteries = [int(x) for x in list(bank)]
    # Find largest and second largest in order (can't rearrange batteries)
    largest = -1
    second = -1

    for index, b in enumerate(batteries):
        if(largest == 9 and second == 9):break
        # Find largest and second largest without rearranging
        # so for example in: 811111111111119 --> largest = 8, second = 9
        # and in: 818181911112111 ---> largest = 9, second = 2
        # So if largest found and it's not last in the bank, reset second largest
        if b > largest and index != len(batteries) - 1:
            second = -1
            largest = b
        elif b > second:
            second = b

    sum = str(largest) + str(second)
    p1 += int(sum)

    # P2
    idx = 0
    largest_bank = ""
    numbers_left = 12
    # Go until numbers_left is 0
    for num in range(numbers_left,0,-1):
        idx, lb = find_largest_battery(batteries, num, idx)
        largest_bank += str(lb)

    p2 += int(largest_bank)
        




print()
print("P1", p1)
print("P2", p2)
