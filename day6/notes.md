## Notes
#### Part 1:
After seeing the prompt and input for today's challenge, this looks like it should be easy! 

While reading the input, I should make a 2d array, fill the empty spaces with 0's and fill the spaces that contain obstacles with 1's. 

I should get the guard's starting location, and iterate through the grid until the x or y index are out of bounds, meaning that the guard leaves the mapped area.

For every step, I should add the location to a set, that way I don't have to manage if the guard's position is unique or not.

#### Part 2:
This seems a little difficult!

We now need to detect cycles in the guard's path, if we end up adding an obstacle.

I turned to my notebook for this one as it wasn't as straightforward as the other challenges.

I ended up adding another set, holding the positions of the obstacles that the guard encounters along with the direction of the guard at the time.

If there is a match with a position and direction, that means that there is a loop.

## Reflection
Definitely learned this time to not spin my wheels, and look online for hints when I am stuck. I was doing most of what I needed to do, but I was have false positives. The issue is that I wasn't accounting for the guard's direction when coming in contact with the obstacle.

I also need to find a better way of storing distinct values rather than strings in a set, as those can be slow.