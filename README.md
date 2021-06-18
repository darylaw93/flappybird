# Flappy-Bird

//Overall game flow//

Game Start -> Avoid Obstacles -> Collision -> Game Ends

//Most challenging part of the project//

/Jumping animation/

Started with each jump being 100px, looked unnatural and instanteneous, more akin to teleporting.

Solution: setInterval, to call the jump multiple times in small increments.

/Collision/

Could get the collision on the pipes but couldn't get the bird to go through the gaps

Solution: Gaps were in the negative value and for the bird to pass, its CSS position had to be defined in negative instead

//Further work and next steps//

Start screen without breaking the game

Graphical Improvements

Cleaner Code

App Store, Steam, Forbes 30 under 30, shake hands with Mdm Pres at Istana.
