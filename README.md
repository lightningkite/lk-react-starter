# Lightning Kite React Starter

The purpose of this project is to be a starting point for new React apps that use Lightning Server as the backend. It is already set up with many packages that will be used in almost all projects including:

- Authentication
- Ability to switch which backend deployment is used from the login screen
- Mock API for local development without running the backend
- MUI UI component library including material icons
- React Router with several example routes for reference
- Formik for form state management
- Eslint, Prettier, and automatic import reordering

## TODO

- Generating icons and stuff
- Setting theme color, description, titles
- Mock API
- Login screen developer options
- Explain folder structure in readme
- Change localstorage keys prefix
- Change deployment type options in env helpers, .env.example, check on login form to show controls
- Formik
- Birthday with MUIX date pickers

## Using the Starter Project

This starter project can be run locally with node 16 by running `npm install` then `npm start`. To use it as a starter for a new project, fork this repo, then follow the steps below.

### Node

This project is compatible with node version 16 (LTS).

NVM is recommended for easily manage installed node versions. Install nvm using this guide: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm). Then, run `nvm install 16` and `nvm use 16`.

### Configure Environment Variables

Create a new `.env` file using the example (`cp .env.example .env`). Errors will be logged to the console if the correct env variables do not exist.

#### `REACT_APP_BACKEND_HTTP_URL`

This is the default backend URL for the deployment. The actual backend URL being used can still be customized using the developer options on the login screen

#### `REACT_APP_DEPLOYMENT_TYPE`

This project is currently configured to accept the options `local`, `dev`, `staging`, or `production`.

If you decide to use different options, you will also need to update the options in `src/utils/helpers/envHelpers.ts`. This file also exports typed variables for all of the env variables so that they can be used safely in typescript.

### Lightning Server SDK & Mock Data

Generate an SDK your project's lightning server backend, then use it to replace the file `src/api/sdk.ts`.

There are 2 relevant files for using mock data located in the `src/api` directory: `mockDatastore.ts` and `mockApi.ts`.

The MockDatastore interface should contain all models provided by your app's backend through rest endpoints. For each of your apps models, create a function to generate mock data and put it in a file in the `src/api/mocks` directory. Use these function to generate a MockDatastore object in the `generateMockDatastore` function.

In `mockApi.ts`, the `MockApi` class should implement the `Api` interface from your SDK to provide mock data without making any calls to a server. The `mockRestEndpointFunctions` function from lightning-server-simplified will mock all of the standard rest endpoints for you.

To use the mock API, select the Mock server from the login screen.

### Project Organization

All source code should be placed in the `src` directory. `App.tsx` contains the switch for rendering either the authenticated routes or unauthenticated routes depending on the auth state, and providing react context to the app.

Most projects will benefit from using the following organization inside `src`:

#### `layouts`

#### `routers`

#### `pages`

One component for each "page" or "view" in the application. These pages are conditionally rendered by the routers. If all unique code for a page can reasonably be included in one file, then place the .tsx file directly in the `pages` directory. If the page has several components (see for example the Login page), create a directory for that page with an `index.ts` file inside.

#### `components`

React components that can be reused across many different pages.

#### `styles`

#### `api`

#### `utils`

### Colors and Icons

### Deployment
