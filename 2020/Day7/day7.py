import re
import os
import sys
sys.setrecursionlimit(10**6)


def solve(lines):
    print("*******************************")
    print("       Day7 - Part 1           \n")
    bags = []
    rules = []
    for line in lines:
        rule = line.rstrip('\n')
        rules.append(rule)
        if "shiny gold" in rule:
            parts = rule.split("contain")
            if("shiny gold" not in parts[0]):
                bags.append(parts[0].replace("bags", "").strip())
    bagCount = len(bags)
    iterationCount = 0

    while True:
        if(iterationCount == bagCount):
            break
        else:
            iterationCount = bagCount
            for rule in rules:
                for bag in bags:
                    if(bag in rule):
                        parts = rule.split("contain")
                        if(bag not in parts[0]):
                            if(parts[0].replace("bags", "").strip() not in bags):
                                bags.append(parts[0].replace(
                                    "bags", "").strip().replace(".", ""))
                                iterationCount += 1

    print(f"Solution: {len(bags)}")
    print("*******************************\n")
