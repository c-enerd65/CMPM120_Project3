# CMPM 120 Assignment 3 Overview
A simple platform by which players collect coins and boosts to get from one end of the map to the other. Players must collect a key in level 1 to advance to level 2.

Level 1 - Created by Cienna Esnard
Level 2 - Created by Saira Hamid

## Scoring
- Level 1: 
    > Collecting gems earns the player a minimal amount of gems, ranging form 5 - 50 points; defeating enemies awards the player with 100-300 points depending on enemy difficulty. Findind a sceret room awards the player with 250 points
- Level 2:
    > Collecting all 7 gems on the map awards the player with 175 points total

## Mechanics
- Level 1:
    - Jump from freestanding platforms to reach the end of the level
    - Use stamina to scale walls if they are too high to jump over
    - Collect gems and kill enemies on the map to earn points

- Level 2:
    - Jump on moving platforms
    - Collect gems to earn points and 
    - Use stamina to scale walls if they are too high to jump over 


### rules:
#### Keybinds:
- `LEFT` : Move player left
- `RIGHT` : Move player right
- `UP` : Player jump
     > If player is near wall, `UP` allows the player to grab the wall scale if stamina allows.
        - BUG: Jumping increases stamina by variable amount
- `SPACE` : Player shoots sushi

- `1` : Used in level 2 to bring player to level 1
- `2` : Used in level 1 to bring player to level 2
- `R` : Resets game from the end screen
    > brings player back to the start menu

#### Level 1 Win Condition:
- Player must obtain key to advance to level 2

#### Level 1 Player Death:
- Enviornment collisions:
    - Void death
    - Spike death
- Enemy collisions
- Game ends when player reaches 0 lives 

#### Level 1 Additional Elements:
- Complex Camera: Camera moves with player with some deadzone
    - HUD moves with camera
- Wall grabs: See Keybinds
- Player Death: See Level 1 Player Death
- Enemies: Patrolling enemies
    - Unique damage / movements
    - Player can shoot enemies to unblock path
- Juicy Juice: All interactions have a sound effect
- PowerUps: Player has two boosts they can use in this level
    - Stamina: Gives the player a slight boost in stamina (20 pts)
    - Speed: Player speed doubles allowing them to traverse the map quickly

#### Level 2 Win Condition:
- Player must collect all of the coin on the map

#### Level 2 Additional Elements:
- Complex Camera: Camera moves with player with some deadzone
- PowerUps: Player has two boosts they can use in this level]
- Moving Platforms
