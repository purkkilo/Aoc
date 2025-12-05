import re


def solve(lines):
    print("*******************************")
    print("       Day4 - Part 1           \n")
    passports = []
    empty = ''

    for line in lines:
        if(len(line) > 1):
            empty += line
            if(line == lines[len(lines) - 1]):
                empty = empty.replace("\n", " ")
                passports.append(empty)
                empty = ''

        else:
            empty = empty.replace("\n", " ")
            passports.append(empty)
            empty = ''

    requiredFields = [
        'byr',
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid",
    ]
    validPassports = 0
    for passport in passports:
        fieldCount = 0
        passportFields = []
        for field in requiredFields:
            if(field in passport):
                if(field != 'cid'):
                    passportFields.append(field)
                    fieldCount += 1
            else:
                break
        if(requiredFields == passportFields):
            validPassports += 1

    print(f"Valid passports: {validPassports}")
    print("*******************************\n")


def solve2(lines):
    print("*******************************")
    print("       Day4 - Part 2           \n")
    passports = []
    startString = ''
    for line in lines:
        if(len(line) > 1):
            startString += line
            # Get last line
            if(line == lines[len(lines) - 1]):
                # Add parsed passport to array
                startString = startString.replace("\n", " ")
                passports.append(startString)
                startString = ''

        else:
            # Add parsed passport to array
            startString = startString.replace("\n", " ")
            passports.append(startString)
            startString = ''

    # Check lists
    requiredFields = [
        'byr',
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid",
    ]
    validEcl = [
        "amb",
        "blu",
        "brn",
        "gry",
        "grn",
        "hzl",
        "oth"
    ]

    validPassports = 0
    for passport in passports:
        passportFields = []

        # Check if all required fields present
        for field in requiredFields:
            if(field in passport):
                passportFields.append(field)
            else:
                break

        if(requiredFields == passportFields):
            passportSections = passport.split(" ")
            passportSections = list(filter(None, passportSections))
            validSections = 0
            # Check each section
            for section in passportSections:
                key, value = section.split(":")

                if(key == 'byr'):
                    byr = int(value)
                    if(1920 <= byr <= 2002):
                        validSections += 1
                    else:
                        continue

                if(key == 'iyr'):
                    iyr = int(value)
                    if(2010 <= iyr <= 2020):
                        validSections += 1
                    else:
                        continue
                if(key == 'eyr'):
                    eyr = int(value)
                    if(2020 <= eyr <= 2030):
                        validSections += 1
                    else:
                        continue
                if(key == 'hgt'):
                    if('cm' in value):
                        hgt = int(value.replace('cm', ""))
                        if(150 <= hgt <= 193):
                            validSections += 1
                        else:
                            continue
                    if('in' in value):
                        hgt = int(value.replace('in', ""))
                        if(59 <= hgt <= 76):
                            validSections += 1
                        else:
                            continue
                if(key == 'hcl'):
                    if(value[0] == "#" and len(value) == 7):
                        hcl = value.replace("#", "")
                        pattern = re.compile("[A-Fa-f0-9]+")
                        if(pattern.fullmatch(hcl)):
                            validSections += 1
                        else:
                            continue
                if(key == 'ecl'):
                    if(value in validEcl):
                        validSections += 1
                    else:
                        continue
                if(key == 'pid'):
                    if(len(value) == 9 and value.isnumeric()):
                        validSections += 1
                    else:
                        continue
            if(validSections == 7):
                validPassports += 1

    print(f"Valid passports: {validPassports}")
    print("*******************************\n")
