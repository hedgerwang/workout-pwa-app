# Project Plan

Build a web app from scratch.


# Product Requirement

- Create a new React app project running with a stateless tiny web server.
- The app is a PWA app. It means that user can browser and install this app and run it offline.
- The app is loaded from https://localhost:8080
- When the app loads, it renders the a bug blue button with text "Hello World"


# Set up project
- Create the project structure that includes the directories and files.
- The server is NodeJS. It should support https connection via localhost.
- The UI is built with React and shadcn (https://ui.shadcn.com/)

# Key Requirement
- The app should support hot-reload. It means that when codes changes, incremental bundles should be built and sent to the client with auto-reload.
- UI should be responsive, it should support different viewport sizes and be mobile friendly.
- The JS app should can be served from a static html page that serves the JS file. No additional assets should be needed. Assets like images, CSS should be cncoded and bundled into the JS app.
- Keep the documentations clear and structured. Create makrdown files that explains how things works if needed.
