const input = `133
157
39
74
108
136
92
55
86
46
111
58
80
115
84
67
98
30
40
61
71
114
17
9
123
142
49
158
107
139
104
132
155
96
91
15
11
23
54
6
63
126
3
10
116
87
68
72
109
62
134
103
1
16
101
117
35
120
151
102
85
145
135
79
2
147
33
41
93
52
48
64
81
29
20
110
129
43
148
36
53
26
42
156
154
77
88
73
27
34
12
146
78
47
28
97`;

let input2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const lines = input
  .trim()
  .split("\n")
  .map(Number)
  .sort((a, b) => a - b);
const differences = part1(lines);
console.log(differences);
part2(lines);

function part1(lines) {
  let answer = 0;
  let lastNumber = 0;
  let difference_1 = 0;
  let difference_2 = 0;
  let difference_3 = 0;

  lines.forEach((number) => {
    let difference = number - lastNumber;
    if (difference === 1) {
      difference_1++;
    } else if (difference === 3) {
      difference_3++;
    } else {
      difference_2++;
    }
    lastNumber = number;
  });
  difference_3++;
  answer = difference_1 * difference_3;
  //console.log(difference_1, difference_3, difference_1 * difference_3);
  console.log("Solution 1:", answer ? answer : "No answer found");
  return {
    difference_1: difference_1,
    difference_2: difference_2,
    difference_3: difference_3,
  };
}

function part2(lines) {
  let answer = 0;
  lines.unshift(0);
  lines.push(lines[lines.length - 1] + 3);
  let countArr = [1];

  let iterate = (index, joltDif) => {
    if (lines[index - joltDif] >= lines[index] - 3) {
      return countArr[index - joltDif];
    } else {
      return 0;
    }
  };

  for (let i = 1; i < lines.length; i++) {
    let count = iterate(i, 1) + iterate(i, 2) + iterate(i, 3);
    countArr.push(count);
  }
  //console.log(lines);
  //console.log(countArr);
  answer = countArr[countArr.length - 1];
  console.log("Solution 2:", answer ? answer : "No answer found");
}
