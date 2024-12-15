## Notes
Alright, after a brief reading, my understanding of this challenge is that there is a "manual" and it needs to be updated. 

We are given the updates that need to be made, but they are in the wrong order, but we are given the rules to put them in order.

Updates are basically integer arrays delimited by a comma, and separated by a newline character.

The rule notation is `X|Y`. This means that if `X` and `Y` are in an update, `X` must come before `Y`.

Example input:
```js
47|53 // rules for the ordering of the page numbers in the updates.
97|13
97|61
97|47
// empty line, separating the rules from the updates
75,47,61,53,29 // updates, array of page numbers
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
```

If an update does not include some page numbers, the ordering rules involving those missing page numbers are ignored.

After correctly sorting the updates, we need to sum the middle page number of all the updates.

I feel like I understand this ok, but how do we handle numbers that wont have a rule applied to them? I am guessing just leaving them in place.

#### How do we handle this?

My theory is that we should get the rules that should be applied to the update first.

After we have our rules that are relevant to our update, we should apply them.

#### How do we apply our rules?

Iterating through each page number, getting any rules telling that page number that it should be before it.

Example input:
```js
1|2
2|3
3|4
4|5
6|7

4,3,5,6,1,2
```

The first four rules only matter because we are missing page number seven.

Going through each one step by step:
- `4`
    - **Rule to apply**: `4|5`
    - **Result**: `4,3,5,6,1,2`
        - no change because this rule is already satisfied
- `3`
    - **Rule to apply**: `3|4`
    - **Result**: `3,4,5,6,1,2`
        - `3` was inserted before `4`
- `5`
    - **Rule to apply**: `5|6`
    - **Result**: `3,4,5,6,1,2`
        - no change because this rule is already satisfied
- `6`
    - **Rule to apply**: None
    - **Result**: `3,4,5,6,1,2`
        - no change because there is no relevant rule
- `1`
    - **Rule to apply**: `1|2`
    - **Result**: `3,4,5,6,1,2`
        - no change because this rule is already satisfied
- `2`
    - **Rule to apply**: `2|3`
        - **Result**: `2,3,4,5,6,1`
            - `2` was inserted before `3`

**End result**: `2,3,4,5,6,1`

This is *incorrect*! What needs to happen is for the page number, that the rule depends on, `Y` in this case, is sorted correctly **BEFORE** we apply the rule to `X`.

Lets try this again:
- `4`
    - **Rule to apply:** `4|5`
    - **Depends on:** `5`
        - **Rule to apply:** `5|6`
        - **Depends on:** `6`
            - **Rule to apply:** None
            - No change because there is no relevant rule.
        - No change because this rule is already satisfied.
        - No change because this rule is already satisfied.
    - No change because this rule is already satisfied.
    - **Result:** `4,3,5,6,1,2`
    - **Summary:** No changes.
- `3`
    - **Rule to apply:** `3|4`
    - **Depends on:** `4`
        - **Rule to apply:** `4|5`
        - **Depends on:** `5`
            - **Rule to apply:** `5|6`
            - **Depends on:** `6`
                - **Rule to apply:** None
                - No change because there is no relevant rule.
            - No change because this rule is already satisfied.
        - No change because this rule is already satisfied.
    - `3` inserted before `4`.
    - **Result:** `3,4,5,6,1,2`
    - **Summary:** `3` inserted before `4`.
- `5`
    - **Rule to apply:** `5|6`
    - **Depends on:** `6`
        - **Rule to apply:** None
        - No change because there is no relevant rule.
    - No change because this rule is already satisfied.
    - **Result:** `3,4,5,6,1,2`
    - **Summary:** No changes.
- `6`
    - **Rule to apply:** None
    - No change because there is no relevant rule.
    - **Result:** `3,4,5,6,1,2`
    - **Summary:** No changes.
- `1`
    - **Rule to apply:** `1|2`
    - **Depends on:** `2`
        - **Rule to apply:** `2|3`
        - **Depends on:** `3`
            - **Rule to apply:** `3|4`
            - **Depends on:** `4`
                - **Rule to apply:** `4|5`
                - **Depends on:** `5`
                    - **Rule to apply:** `5|6`
                    - **Depends on:** `6`
                        - **Rule to apply:** None
                        - No change because there is no relevant rule.
                    - No change because this rule is already satisfied.
                - No change because this rule is already satisfied.
            - No change because this rule is already satisfied.
        - `2` inserted before `3`.
    - `1` inserted before `2`.
    - **Result:** `1,2,3,4,5,6`

**End Result**: `1,2,3,4,5,6`

We got it right this time, although this isn't the greatest of examples though as we can't get a "middle" number from it. Just a simple proof of concept.

This algorithm hints that the sort function that we will make for the update arrays should be recursive.

- Sort page number function:
    - Pass the relevant rules, update, and current `X` page number
    - check if there is a rule that applies to the `X` page number
        call sort page number on `Y` page number
        - if rule is being broken
            - Insert `X` accordingly to the rule

After testing this, this is very slow! Lets see how we can make it faster.

Ok, so I was doing things wrong. I mean not that much wrong, but just without efficiency. I now have added a set named `visited`, and I am now adding page numbers that I have visited to it. This basically avoids unnecessary recursion depth, as I was checking things that were already checked, doing nothing but wasting time.

I have also optimized some of the `indexOf` method calls I was making, now making less of them, therefore decreasing the amount of time it takes. 

I was waiting twenty seconds for the previous logic to run, where the new logic does it almost instantly.

This type of algorithm is called a **dependency resolution algorithm**. Dependency resolution algorithms sort elements based on a set of rules defining relationships between the elements, in this case `update` according to the `rules`.

## Reflection
I feel like I should've pushed my work when I first got the answer, instead of pushing it when I was finally happy with it, in order to show my growth a little better.

I need to start researching algorithms that might help for the challenge at hand, as I probably would've had this challenge done a little bit faster. I also need to improve my knowledge about algorithms overall, because I had no clue about the DR algorithm.

This day was very challenging!