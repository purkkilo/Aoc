
def solve(lines):
    print("*******************************")
    print("       Day2 - Part 1           \n")
    passwords = []
    valid_passwords = 0
    for x in lines:
        passwords.append(x)

    for x in passwords:
        line = x.split(":")
        rules = line[0].split(" ")
        rule = rules[0].strip()
        lower_limit = int(rule.split("-")[0])
        upper_limit = int(rule.split("-")[1])
        character = rules[1].strip()
        password = line[1].strip()
        character_count = password.count(character)
        if(character_count >= lower_limit and character_count <= upper_limit):
            valid_passwords += 1
    print(f"Solution (Valid passwords): {valid_passwords}")
    print("*******************************\n")


def solve2(lines):
    print("*******************************")
    print("       Day2 - Part 2           \n")
    passwords = []
    valid_passwords = 0
    for x in lines:
        passwords.append(x)

    for x in passwords:
        line = x.split(":")
        rules = line[0].split(" ")
        rule = rules[0].strip()
        first_index = int(rule.split("-")[0]) - 1
        second_index = int(rule.split("-")[1]) - 1
        character = rules[1].strip()
        password = line[1].strip()

        first_found = password.find(character, first_index, first_index+1)
        second_found = password.find(character, second_index, second_index+1)
        if((first_found > -1 and second_found == -1) or (first_found == -1 and second_found > -1)):
            valid_passwords += 1

    print(f"Solution (Valid passwords): {valid_passwords}")
    print("*******************************\n")
