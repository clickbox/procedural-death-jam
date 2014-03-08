# Idea

Avoider influenced by Pac-man Championship edition

You are a little tadpole thing that doesn't stop moving
	* use arrows to steer left or right
	* or use relative mouse position + clicks?

Each quadrant of the square world contains shinies to collect.  If you collect
all teh shinies in a quadrant, it spawns a new quandrant in the opposite diagonal.

While a quandrant is spawning it flashes white for a little bit, anything that touches
the quandrant will die.  This is the only way to defeat enemies.

Each new quadrant will be pulled from a set (or generated?) and may have terrain, traps, enemies,
and collectibles.

## Enemies

### Arrow  
When you move past its "line of sight" the arrow blinks briefly then charges until it hits something.
Once stopped, the arrow will pause for a moment, then turn around.

### Tadpole
Like the player character, turns right whenever it hits an obstacle.  They turn when they would collide with
each other?

### Snake
Like a tadpole but long like a snake.

### Bouncer
Bounces around the field, has a stack of "shells" that break off as it touches things. 

### Ghost
Like the pacman ghost, it chases

### Hunter
Chases the player only if it has line of sight.  

## Traps


## Other neat ideas
There are 3 or so "themed" areas that have two toned color schemes.  Once you beat all three areas the game
gains a new ring of tiles around the outside and cycles.  9 Stages in total?

When the player dies, they lose a heart and the quadrant they are in spawns in as empty with the player in the middle.
The "Heart" belongs to the quadrant, so you can only die in a quadrant once before its no longer "safe".  Eventually
a new tile will spawn there with a heart in the background and it is safe again.

The player could be a "quarter tile" in size, that way everything else seems gigantic?  But a bigger player character
feels more claustrophobic
