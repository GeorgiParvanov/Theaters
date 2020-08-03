The app uses cloud db - Mongo Atlas
To run the app:
- in terminal run `npm i` and then run `npm start`
- open localhost on port 9999


NOTES TO SELF: 
- utils/authenticate - function logic is incomplete
    - isLoggedIn needs to be fixed too after...
- isPublic field in the views - how to make it checked (for example when edditing a play, if it was public the isPublic checkbox should be checked by default)
- sortByDate doesn't do its job because createdAt is saved in the form of a string and should be in the form of date?
- sortByLikes also has a problem