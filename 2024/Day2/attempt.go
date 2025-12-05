package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
		const testFile = "./test.txt"
		const inputFile = "./input.txt"
		var filePath = ""
		var debug = 0

		if debug == 1 {
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
		part1(lines)
		part2(lines)
	}
	
	func part1(lines[]string) {
		var totalSafe = 0

		// Print each line
		for _, line := range lines {
			var temp = strings.ReplaceAll(strings.Trim(line, " "), "\r", "")
			var numbers = strings.Split(temp, " ")
			const maxDifference = 3
			const minDifference = 1

			isSafe := checkIfSafe(numbers)

			if isSafe {
				totalSafe++
			}
		}
		fmt.Println("Safe:", totalSafe)
	}


	func checkIfSafe(numbers []string) bool {
		const maxDifference = 3
		const minDifference = 1
		var isSafe = true
		var lastNumber = 0
		var ascending = false
		var descending = false
		for i, n := range numbers {
			number, err := strconv.Atoi(n)

			if err != nil {
				fmt.Println(err, i, number)
			} else {
				if i > 0 {
					if number > lastNumber {
						ascending = true
					}
					if number < lastNumber {
						descending = true
					}
					
					var diff = calculateDiff(number, lastNumber)
					
					if diff == 0 || diff > maxDifference || (ascending && descending) {
						isSafe = false
						break
					}
				}
			}

			lastNumber = number
		}

		return isSafe
	}

	func part2(lines []string) {
		var totalSafe = 0

		// Print each line
		for _, line := range lines {
			var temp = strings.ReplaceAll(strings.Trim(line, " "), "\r", "")
			var numbers = strings.Split(temp, " ")
			if checkIfSafe(numbers) {
				totalSafe++
				continue
			} 

			for j:=0;j<len(numbers)-1;j++ {
				// dunno anymore
				newNumbers := make([]string, len(numbers))
				_ = copy(newNumbers, numbers)
				newNumbers = append(newNumbers[:j],newNumbers[j+1:]...)

				if checkIfSafe(newNumbers) {
					totalSafe++
					break
				}
			}
		}
		fmt.Println("Safe with dampener:", totalSafe)
	}

	func calculateDiff(x, y int) int {
		if x < y {
			 return y - x
		}
		return x - y
	}