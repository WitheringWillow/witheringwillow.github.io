# Documentation for TETR.JS
- This is not affilated with anyone else
- Yes I know that this name has been used about 90 times
- The creators of this code are:
  - WitheringWillow
  - AnthonyFic-code
  - MagicPickle123
- Created for a final

# The actual documentation 
### Blocks
Blocks are defined with a square 2D array. They can be rotated with the `.rot()` function

### Displaying and display()
display() will clear the current board and redisplay the grid.  
Grids are displayed by assigning each item a Mino, containing the x, y, and color.

### addMinos()
addMinos will take in a square 2D array, and an x and y value as input.  
It will check if the block can fit in the space. If it can't, the function will stop.  
Then, it puts the block in the grid at its position.  
Blocks start at the top left.

### Guidelines?
In code, the order of tetraminos should go Z, S, L, J, T, I, O

# TODO
1) Make the piece
2) Give it controls
3) Place the piece