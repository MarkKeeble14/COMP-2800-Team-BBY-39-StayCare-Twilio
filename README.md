# StayCare

## About the App

StayCare is a webapp designed to provide respite for overworked parents while connecting their young children with a healthy and interactive
form of entertainment. Due to the current COVID-19 pandemic, most if not all daycares have been closed down for the foreseeable future, leaving
many parents with their youngins 24/7, as well as many child-care professionals out of a career. StayCare offers what is essentially 'online daycare'. Workers can schedule activities that parents can then view and sign up their children for. When the activities begin, any users who are signed up for the activitiy are able to join a video room where they can tal, interact, and have fun with each other!

## How does it work?

When first visiting the page, you can sign up either as a parent or a worker. A parent can add
kids to their profile, and sign them up for different activities. At the scheduled time for that
activity, they can join the video conferencing room for that activity. A worker can post and
schedule activities, enter the room when it is time to start, and lead a fun activity for all those
who joined!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

Note: This project has only been worked on using a windows PC, and so these instructions may not be accurate for mac or linux systems.

1. Clone the repo onto your local machine

2. Ensure that you have Yarn installed by running command 'yarn --version' on your command line. If you do not have yarn installed, visit https://classic.yarnpkg.com/en/docs/install/#windows-stable and click "Download Installer" and follow the installation process till it is intalled.

3. Navigate into the cloned repo

4. Ensure that you have gatsby CLI installed by running command 'gatsby -v' on your command line. If you do not have gatsby CLI installed, run command 'npm install -g gatsby-cli'.

5. Run command 'npm install'. This will install all of the dependencies that our app uses onto your machine.

6. Start localhost by running 'yarn develop'. This will start the server at url 'localhost:8000'

7. In your browser, enter url 'localhost:8000'

8. This repo is using GitFlow Workflow, so any additions you make should first be made on your own feature branch off of branch dev.

### Prerequisites

To run, you'll need...

1. Yarn

2. Node Package Manager

3. Some kind of text editor, ie Visual Studio, Notepad, etc.

This project uses Firebase, and as such the firebase configuration is located in **`/src/elements/js/firebase.js`**.

## Testing

Here is our test plan: https://docs.google.com/spreadsheets/d/10vhpAY80jSUrEzoKHYR-qveSCtYnjgJR7Ar6RTAMHu0/edit?usp=sharing

## Languages / Frameworks

For this project, we used...

1. JSX

2. React

3. Gatsby

4. HTML

5. JavaScript

6. CSS

7. JQuery

## Authors

* **Jakob Fipke** - Term 2 Student, BCIT CST

* **Jonathan Orfani** - Term 2 Student, BCIT CST

* **Justin Xie** - Term 3 Student, BCIT CST

* **Mark Keeble** - Term 3 Student, BCIT CST

If anyone wants to make any additions/modifications to the application and requires any passwords/api keys, they can email me at 

markkeeble01@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## What's inside?

The important files and directories you'll see in this project

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

In the **`/src`** directory, there are a few folders.

**`/src/elements`**: Contains all of the elements which the app is made with, which is to say the react components as well as the css and JavaScript files. Inside of the components folder, the components are seperated into folders based on which pages they relate to. Components which are used on multiple pages are located within **`/src/elements/components/used-across-pages-components`**.

**`/src/pages`**: Contains the high-level .js files which dictate what to render at each page (path).

**`/src/images`**: Contains the images used in the app.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

## Acknowledgments

* Build a Video App With Twilio + Gatsby (with Nathaniel Okenwa) — Learn With Jason: https://www.youtube.com/watch?v=K02SnxY6c_0& - Jason Lengstorf & Nathaniel Okenwa

This tutorial was followed to both initially set up our Gatsby/React app, as well as to create the functionality for Twilio's programmable video.

* how to mute/unmute pause/unpause audio and video in twilio video call: https://stackoverflow.com/a/57901308 - Nagesh Tripathi

This was used to create the controls within the twilio rooms. IE muting audio, pausing video, etc.

* WebpackError: ReferenceError: IDBIndex is not defined while building with Gatsby.JS (ver #2.15.21): https://github.com/firebase/firebase-js-sdk/issues/2222#issuecomment-538072948 - hsubox76 

Firebase doesn't run well within Node, so this block of code essentially told Webpack to import Firebase only when building the HTML.

* Simple Email and Google Auth with React and Firebase: https://medium.com/better-programming/dead-simple-auth-with-react-and-firebase-592e40ff43c5 - Indrek Lasn

This tutorial was followed to set up basic authentication, which we then modified to fit our needs.