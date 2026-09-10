# BraiinsACNHBirthday
Legacy JS version before migration to TypeScript. Unlike the other legacy version, this branch already uses the Nookiepedia API rather than local storage data which was out of date. Still uses older image placement logic so villager's pictures may be wonky!

A simple Express API which generates an image to display on a Braiins Deck if an Animal Crossing villager has a birthday today. Uses the Nookipedia API to fetch villager data and images.

Setup:
1. Request an API key from Nookipedia at api.nookipedia.com
2. Add API key to .env as "API_KEY"
3. Run
4. Use the route /getImage in Braiins Deck's image widget - Ex: 'https://examplelink/getImage?height={{height}}&width={{width}}'

Routes:
1. '/' - GET : Returns a simple message that the app is running
2. '/getImage' - GET : Returns a "Happy Birthday" image when it's a villager's birthday, and Have a Nice Day if it isn't anyone's birthday. If called from a Braiins Deck, set proper parameters in latest Deck version. It should format to its resolution. **Haven't tested with split view.**
- Params :
1. Height (Default 480): Image height. Should be set automatically on Braiins by using the placeholder {{height}} in the Deck control pannel.
2. Width (Default 1280): Image width. Should be set automatically on Braiins by using the placeholder {{width}} in the Deck control pannel.
