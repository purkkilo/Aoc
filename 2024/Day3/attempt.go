package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func main() {
		const testFile = "./test.txt"
		const inputFile = "./input.txt"
		var filePath = ""
		var debug = 1

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
		re,_ := regexp.Compile(`/mul\([-0-9]+,[-0-9]+\)/g`)
		// Print each line
		for _, line := range lines {
				var numbers = strings.Split(line, "  ")
				for _ , l := range numbers {
					var t = strings.ReplaceAll(strings.Trim(l, " "), "\r", "")
					res := re.MatchString(t) 
					fmt.Println(res)
				}
		}

	}
	
	func part1() {
		fmt.Println("Solution:")
	}

	func part2() {
		fmt.Println("Solution:")
	}