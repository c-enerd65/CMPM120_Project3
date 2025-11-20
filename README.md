# CMPM 120 Assignment 3 Overview
A simple platform by which players collect coins and boosts to get from one end of the map to the other. Players must collect a key in level 1 to advance to level 2.

Level 1 - Created by Cienna Esnard
Level 2 - Created by Saira Hamid

## Scoring
Level 1: Collecting gems earns the player a minimal amount of gems, ranging form 5 - 50 points; defeating enemies awards the player with 100-300 points depending on enemy difficulty. Findind a sceret room awards the player with 250 points

## Added Mechanics
- Player can get a candelabra and find matches to unlock special dialogue in a room
- Player must explore a significant portion if not almost the entire map to successfully complete main quest
- Player is encouraged to enage with their surroundings by clicking the interation buttons
- A basic system is explained as the player traverses the map
- Data added to room struct to streamline interations including: 'host', 'score', and 'code'
- Two alternate endings provided for the player (good / bad)


### rules:
#### Keybinds:
- `LEFT` : Move player left
- `RIGHT` : Move player right
- `UP` : Player jump
     > If player is near wall, `UP` allows the player to grab the wall scale if stamina allows.
- `SPACE` : Player shoots sushi

- `1` : Used in level 2 to bring player to level 1
- `2` : Used in level 1 to bring player to level 2
- `R` : Resets level

#### Level 1 Win Condition:
- Player must obtain key to advance to level 2

#### Level 1 Player Death:
- Enviornment collisions:
    > Void death
    > Spike death
- Enemy collisions
- Game ends when player reaches 0 lives  

