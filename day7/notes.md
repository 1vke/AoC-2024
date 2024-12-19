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
## Reflection