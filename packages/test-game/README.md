# Test Game

## Brainstorming

Characteristics

- Minimalistic
  - Graphics minimal:
    - [ascii characters](https://www.w3schools.com/charsets/ref_html_ascii.asp)

    - monospace font: Courier New
      - it is [web-safe](https://www.w3schools.com/cssref/css_websafe_fonts.php)
      - VSCode uses Menlo, Monaco, 'Courier New', monospace
      - basically, ascii characters work well in all monospace fonts, different vibes

    - monochromatic
      - develop in black and white
      - allow for palette changes and mods

  - Gameplay minimal: Very simple mechanics

- Casual
  - No enemies?
  - Or can be switched off, like Minecraft
  - Would be nice to build stuff to protect from enemies anyways

- Can stop anytime
  - Turn-based, no time-critical actions

- Can begin wherever left off
  - Save system
    - Platform agnostic save system
    - version coded for backwards compatibility

- Can play on PC/Mobile browsers, easily port to apps

Intended Experience

- Empty black space, explore
- Similar to ThreeBodyProblem game in the book, seemingly empty but a lot of hidden complexity
- Can build something, a sense of progress

Game Goal

- to... explore, build and create?

Explore

- sense of movement
  - environment
    - patches of grass?
    - walls, structures?
      - simple structures can give rise to... civilazations?
    - water/lakes/rivers?

  - movement
    - by default, camera follows player, player "stays in the center"
    - like league, can move the camera to look around, fix camera while moving the player
    - when fixed camera and player moves, if player moves out of camera... do nothing lol, cuz can turn off fixed camera mode to snap back to player anyways

- complexity -> interactions
  - npcs? dialogues?
  - how to interact?
  - signposts like pokemon?
    - interact to show a dialogue below?

- build
  - creations to interact with environment?
    - goals: to collect more resources?
  - implies need to collect resources to build stuff?
    - but then... becomes resource management game? kinda complex and "capitalist tho" lol
  - But it really is so satisfying to build stuff

Life of Quality Features

- if have interactable on up direction one space ahead, and moved upwards, since directly facing interactable, can highlight the interactable in `[ ]` to show that it is interactable

## ASCII Art

ASCII Ref
. : ; ' " / ? ! @ # $ % ^ & * ( ) [ ] { } - _ = + < > ` ~

### Unused Symbols

0: too similar with @ and O

### Reserved Symbols

Command-prefix: /

### Symbols

Tooltip: < >
Warning: !
Selection: [ ]

### Objects

@: Player
m: Baby Monster
M: Adult Monster
O: Egg  

### Environment

~: Water  
\#: (block)  
": Grass (Unwalked)
': Grass (Walked)
=: Brick

### Environment Concept Art

Water

```none
~~~~~#           
~~~~~~#           
~~~~~~~#
~~~~~~~#    @
~~~~~~~#
~~~~~#
~~~#
~~~~#
```

Grass

```none
""""'"""""""""""           
""""'""""""""""           
"""""'""""""""
""""""'""""""    
""""""''''''    @
"""""""""""
""""""""""
"""""""""
```

Bricks

```none
   =================
   =================
   ==             ==
   ==             ==
   ==      @      ==
   ==             ==
   ==             ==
   ====         ====
   ====         ====
```

### Movement Concept Art

Face/Select Up

```none
[ ]<tooltip> 
 @

```

Face/Select Down

```none

 @
[ ]<tooltip>
```

Face/Select Right

```none
   
 @ ]<tooltip>
e    
```

Face/Select Left

```none

<tooltip>[ @

```
