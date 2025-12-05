
import sys
from os import path
from Day1 import day1
from Day2 import day2
from Day3 import day3
from Day4 import day4
from Day5 import day5
from Day6 import day6
from Day7 import day7

arguments = sys.argv
arguments.pop(0)
for argument in arguments:
    if(argument.isnumeric() and (1 <= int(argument) <= 25)):
        inputFile = f"./Day{argument}/input.txt"
        if(path.exists(inputFile)):
            f = open(inputFile, "r")
            lines = f.readlines()
            if(argument == '1'):
                day1.solve(lines)
                day1.solve2(lines)
            if(argument == '2'):
                day2.solve(lines)
                day2.solve2(lines)
            if(argument == '3'):
                day3.solve(lines)
                day3.solve2(lines)
            if(argument == '4'):
                day4.solve(lines)
                day4.solve2(lines)
            if(argument == '5'):
                day5.solve(lines)
            if(argument == '6'):
                day6.solve(lines)
                day6.solve2(lines)
            if(argument == '7'):
                day7.solve(lines)
                # day7.solve2(lines)
        else:
            print("*******************************")
            print(f"   Day{argument} - Incoming soon\n")
            print("*******************************\n")
    else:
        print(f"Invalid argument ({argument}) -> Input days from 1 - 25")
