## Notes
#### Part 1:
This seems pretty easy!

I have chosen to store the data as an array consisting of arrays with a number and string, or test value and expression.

Example: `[1234, '1 2 3 4']`

First, we need to calculate the operator amount, or the number of space characters in a expression.

We can do that by splitting the string by space characters, and get the length of the numbers minus one to obtain the operator amount.

The number of possible expressions is calculated by getting the number of operators to the power of the operator amount of the current expression.

We should then iterate through the number of possibilities, getting a number that we can get the base two of and turn that into a list of operator indexes that we will apply to the expression, filling the spaces in with the relative operators.

After we get and fill the expression with operators, we will solve it and then compare the answer to the test value.

If the answers are the same, then the expression is correct/solvable.

From here it should be really easy, just taking the expressions that were solvable and adding up their test values, obtaining the sum.

---

Answer: `538191549061`

First try!

#### Part 2:
I didn't write any notes before solving this part, but something to jot down would be my solution for combining numbers: `17 || 18 --> 1718`.

Originally, I was doing this via string concatenation, so I would put X and Y next to each other in a string, then parse that string as an integer. 

I decided that this time I wanted to go away from strings to make the solution a little faster, and I found out that you can do what I was trying to achieve very easily with some math.

If X was `17` and Y was `18`, you would multiply X by 10 to the power of the amount of digits from Y. So, in this case, it would yield `1700`. Simply add Y to our new X value, and you got `1718`. Getting the number of digits mathematically was the hard part for me, I ended up finding an answer on stack overflow that worked pretty well.
---
Answer: `34612812972206`

Second try! Just had to change how I was dealing with the new operator a small amount. Still got it very quickly.

## Reflection
MOVE. AWAY. FROM. STRINGS.

I feel like I keep saying this, but I am still using strings. They make my solutions pretty slow sometimes (in most cases, only the second solution). Nothing that can't be fixed!

Other than that, this day was pretty cool because I had done something very similar a couple years ago, so it was a pretty good refresher.