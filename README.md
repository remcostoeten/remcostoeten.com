Goal here is to create an personal site without real usecase but rather for me to expirment in making all sorts of things I feel like.

Currently the site has firebase/google authentication which allows users to login with gmail and show/hide certain data based on login, also show their avatar and username etc.

I've build a offcanvas menu which I obviously could've installed a NPM package but the goal here was to gather information about hooks and overall react knowledge regarding states and useEffect etc. Styling is also my own SCSS.

Another feature which is WiP and mostly private is a showcase of chat history from whatasapp. In whatsapp you can export your chat data which gives you a plain .txt file. I converted the .txt to .json objects which I load into this repo from another private repo as an API. I then fetch the data and map over it to display the chat messages. Goal here was to understand and improve data fetching, api's and mapping. It's still WiP, the data is showing and working nicely with a live-search but it needs to be improved. I have one specific whatsapp export which is a couple year old chat containing nearly 1 million chat messages. You would not expect it but browsers do have a little bit off trouble with showing nearly a million objects at the same time. So i'm looking into lazyload/api pagination solutions for this. I will provide a demo export page to showcase the feature I made once it's fully merged.

The whatsapp export is personal data but i've made a dummy json to showcase what i've made. The front-end can be viewed here: https://remcostoeten.com/whatsapp.

And besides that dozens off other features (see branches) which are WiP or postponed tutorials. Litterly freestyling my way and making stuff which for me is the way to learn. I can watch video's or read documentation all day, but actually building stuff that actually has purpose yields more result for me personally.
