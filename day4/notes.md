## Notes
#### Part 1:
I need to comb through the "word search" or input and see how many times XMAS appears. 

I feel like here a 2d array would work best, but we can kind of mimic that by just iterating through the string. 

For each line in the input, we need to:
    - check each character for an XMAS match.
        - simply check for X's because yk "XMAS" begins with X
        - if have an X, check all directions for "MAS"

#### Part 2:
Wow. So now instead of finding a word, we now need to find a literal x-mas:
```
M.S   M.M   S.M   S.S
.A.   .A.   .A.   .A.
M.S   S.S   S.M   M.M
```

For this, I can't just add on to what I previously had, except for the `scanForWords` function.

I am thinking that I get the indexes without the first and last index of the rows and columns, and then check each corner from that index for a word.

The pivot of the "X-MAS" is `A`, so we need to look for `A` then check each respective corner from the `A`.

So, if there was an `A` at the indexes of `[1, 1]`, we would check `[0, 0]`, `[2, 0]`, `[2, 2]`, and `[0, 2]`.

## Reflection
I liked the first part a lot, not so much the second, but it was still fun!

I learned a lot about manipulating arrays to get what I want, and in this case it was a set of indexes I needed to check for words. I am starting to think maybe for things like the input data and word I should reference the global variable rather than passing it to all of my functions. I feel like it clutters up my functions quite a bit, and it doesn't serve a good enough purpose for me to keep it.