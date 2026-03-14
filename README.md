# BraiinsACNHBirthday
# OLD VERSION WHICH WORKS FROM A LOCAL JSON FILE BEFORE MOVING TO NOOKIPEDIA API

A simple Express API which generates an image to display on a Braiins Deck if an Animal Crossing villager has a birthday today.

The required files are stored in resources:
A default.png image for when there isn't a birthday.
A background.png for the background of the whole image.
A font.ttf that Canvas will use for a font.
A Villagers.json file which is a list of villagers.

On request, the program checks the list to see if a villager has a birthday today. It then generates an image with the villager's portrait, and happy birthday. If no villager has a birthday, it generates a simple "Have a nice day, everyone!"

Ideas if I keep working on it:
-Efficiency tweaks where possible. Maybe allow for configuring different default file links/locations.
-Scheduled image generation rather than on request? Request simply sends image.
-Localisation - More of a could be fun to do to learn.
