# BraiinsACNHBirthday

A simple Express API which generates an image to display on a Braiins Deck if an Animal Crossing villager has a birthday today. This version uses the Nookipedia API to fetch latest villager data.

Setup:
1. Request an API key for Nookipedia at api.nookipedia.com
2. Add API key to .env as "API_KEY"
3. Run
4. Use the route /getImage in Braiins Deck's image widget

Routes:
- '/' - GET : Returns a simple message that the app is running
- '/getImage' - GET : Returns a "Happy Birthday" image when it's a villager's birthday, and Have a Nice Day if it isn't anyone's birthday. If called from a Braiins Deck, set proper parameters in latest Deck version. It should format to its resolution. **Haven't tested with split view.**
Params :
1. Height (Default 480): Image height. Should be set automatically on Braiins by using the placeholder {{height}} in the Deck control pannel.
2. Width (Default 1280): Image height. Should be set automatically on Braiins by using the placeholder {{height}} in the Deck control pannel.