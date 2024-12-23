## Notes

#### Part 1:

**Things to note:**

-   Antinodes exist at any point that is perfectly inline with two antennas of the same frequency
-   antinodes can exist where antennas already exist
-   antinodes are restricted to the bounds of the map

The input should be parsed by getting all of the antenna locations.

Then we should iterate through the locations of the antennas, getting the location of antennas with the same frequency, and then add the antinodes if they are within the bounds of the map.

We will get the antinodes by getting the difference of the X and Y position in the antenna locations, then calculate the positions of them. If the antinode locations are out of bounds, they will not be kept track of.

Something to research this time around would be how to store coordinates like `X,Y` in a data structure that wouldn't allow for duplicates.

After doing some research, I have found that I can create a matrix to keep track of coordinates, or I can just have objects in an array and check if there are any duplicates.

I have decided to go through with the object array for simplicity.

---

Answer: `222`

Got it around the third or fourth try!

I made a mistake calculating the second antinode and a mistake in my logic for checking if antinodes aren't unique. Very small fixes.

#### Part 2:

## Reflection
