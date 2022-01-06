# FISHEYE - APP

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Command `yarn start`
#### Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### The page will reload if you make edits.
You will also see any lint errors in the console.

#### Folders Structure
The src folder contains the development elements of the application : 
- /Assets/Images : logo
- /Components : components of the application (Header, Card, CardMedia, TagsComponent, ModifyPhotographer)
- /Pages : Home, Login (to connect a user), Profile (guest viewer or connected user's page), createNewPhotographer(once after creating a new user), createNewMedia, ModifyMedia and Error
- /Utils : /styles (css), selectors (link to store) and store
- index.jsx : ReactDom with Router and Provider

### Command `yarn test`
Few tests on components.

Launches the test runner in the interactive watch mode.

### Command `yarn build`
#### Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

#### The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Command `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

__CRA :__ You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

__React :__ To learn React, check out the [React documentation](https://reactjs.org/).

__Redux :__ To learn React, check out the [Redux documentation](https://redux.js.org/).

__React-Redux :__ To learn React, check out the [React-Redux documentation](https://react-redux.js.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)