package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
		const testFile = "./test.txt"
		const inputFile = "./input.txt"
		var filePath = ""
		var debug = false

		if debug {
			filePath = testFile
		} else {
			filePath = inputFile
		}

		// Read the entire file into memory
		data, err := os.ReadFile(filePath)
		if err != nil {
			fmt.Printf("failed to read file: %s", err)
		}

		// Split the file content into lines
		var lines = strings.Split(string(data), "\n")
		var leftNums []int
		var rightNums []int
		// Print each line
		for _, line := range lines {
				var numbers = strings.Split(line, "  ")
				for i , l := range numbers {
					var t = strings.ReplaceAll(strings.Trim(l, " "), "\r", "") 
					number, err := strconv.Atoi(t)
					if err != nil {
						fmt.Println(err, i, number)
					} else {
						if i == 0 {
							leftNums = append(leftNums, number)
						} else if i == 1 {
							rightNums = append(rightNums, number)
						}
					}


				}
		}
			sort.Ints(leftNums)
			sort.Ints(rightNums)
			part1(leftNums, rightNums)
			part2(leftNums, rightNums)
	}

	func calculateDiff(x, y int) int {
		if x < y {
			 return y - x
		}
		return x - y
	}
	
	
	
	func part1(leftNums []int, rightNums []int) {
		var total = 0
		for i, number := range leftNums {
			total += calculateDiff(number, rightNums[i])
		}
		fmt.Println("Difference:", total)
	}

	func part2(leftNums []int, rightNums []int) {
		// Go has somekind of filter or search function for slices?
		// dunno, so for loops it is
		var similarity = 0
		for _, number := range leftNums {
			var occurences = 0
			for _, number2 := range rightNums {
				if (number == number2) {
					occurences++
				} else if number2 > number {
					// Since the slices are sorted, if number is bigger, move on
					break
				}
			}
			similarity += number * occurences
		}
		fmt.Println("Similarity:", similarity)
	}