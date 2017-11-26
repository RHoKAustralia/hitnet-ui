# Hitnet Hub Content Manager

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

See this guide on how to perform common tasks with Create React App: [Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Deployment

This project is deployed via Heroku. It uses a static buildpack in order to run on a Heroku dyno, as the app is just a frontend. The buildpack is a fork of heroku's OSS static buildback. We needed to add nginx config so the site would have basic auth for simple security.
