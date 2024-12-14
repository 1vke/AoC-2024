## Notes
#### Part 1:
Input data is basically "corrupted memory"

The job is to comb through the data, to find "uncorrupted" multiplication instructions, example: `mul(5,5)`.

Sample "corrupted" instructions:
`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

Valid instructions from "corrupted" instructions above:
`mul(2,4)`, `mul(5,5)`, `mul(11,8)`, `mul(8,5)`

I think what would be best here is to run the data through a regex, returning only `mul(X,X)`. Learning time!

Back from learning, the regex should be: `/mul\(\d+,\d+\)/g`

Explanation:
- `/` delimiter (starts the expression)
- `mul` matches the characters mul literally (case sensitive)
- `\(` matches the character `(` literally
- `\d` matches a digit (equivalent to [0-9])
- `+` matches the previous token between one and unlimited times, as many times as possible, giving back as needed (greedy), in this case allowing for multiple digits
- `,` matches the character literally
- `\d` matches a digit (equivalent to [0-9])
- `+` matches the previous token between one and unlimited times, as many times as possible, giving back as needed (greedy), in this case allowing for multiple digits
- `\)` matches the character `)` literally
- `/` delimiter (ends the expression)
- `g` modifier: global. All matches (don't return after first match)

[regex101](https://regex101.com/) made this really easy to learn! Most of the explanation also came from their regex editor. The more you know!

#### Part 2:
This time, we need to find conditional statements: `do()` or `don't()`.

The multiplication instructions should be ran according to the last conditional statement.

Sample "corrupted" instructions:
`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

Valid instructions from "corrupted" instructions above, with conditional statement logic:
`mul(2,4)`, `mul(8,5)`

More learning! I am going to see if there is a way to do this purely in regex.

Back from learning, the regex should be: `/don't\(\).*?(do\(\)|$)/g`

Explanation
- `/` delimiter (starts the expression)
- `don't` matches the characters don't literally (case sensitive)
- `\(` and `\)` matches the characters "(" and ")" literally
- `.` matches any character (except for line terminators)
- Capturing Group `(do\(\)|$)`
    - 1st Alternative `do\(\)`
        - `do` matches the characters do literally (case sensitive)
        - `\(` and `\)` matches the characters "(" and ")" literally
    - 2nd Alternative `$`
        - `$` asserts position at the end of the string, or before the line terminator right at the end of the string (if any)
- `/` delimiter (ends the expression)
- `g` modifier: global. All matches (don't return after first match)

I can now use this regex on the "corrupted memory" or the input to remove the unneeded logic before getting the multiplication instructions.

## Reflection
I seemed to get this challenge a whole lot faster than the last one!

I liked this challenge because it opened my eyes to regex, which I simply have been avoiding ever since I started coding because it looked complicated. It still looks complicated, but it turned out to be really useful for me in this challenge, and I look forward to taking the knowledge and resources that I have gained from this challenge into my future challenges, projects, and endeavors. 