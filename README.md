# Movie Memo [![Netlify Status](https://api.netlify.com/api/v1/badges/6a486635-27ab-4dce-902f-a183c257f856/deploy-status)](https://app.netlify.com/sites/movie-memo-kb/deploys) 
<img alt="Movie Memo Landing Page" src="https://i.imgur.com/IUX2OmE.png">


## Live Website
[Live Website](https://movie-memo-kb.netlify.app/)

## Live Video Walkthrough of Movie Memo
[Walkthrough Video](https://www.loom.com/share/92ef33acaa76434f99cefff6de4ffcff?sid=63df8175-bdc8-4741-a21a-3a459d9d794c)


## Starting the Project
1. Clone the repo on your local machine
1. Grab the credentials from your **Almost Amazon** project from earlier in the cohort. 
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">
