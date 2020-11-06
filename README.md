#Product - Node

This API allows users to save products in stock and sell them. The API can be used as a boilerplate to create 
a more complex purchase service.

### For running on local machine

1. Install the dependencies with `npm install`
2. Run the docker-compose up debug option with `docker-compose -f "docker-compose.environment.yml" up -d --build` to up mongodb database
3. Run the application in development mode with `npm run dev`
4. Access `https://localhost:4000` and you're ready to go!

### Docs

The API documentation are available at `http://localhost:4000/api/docs`. The documentation is based on (Swagger/OAS 3.0).

## Scripts

The Api provides a collection of npm scripts that can help you. You can run them with `npm run <script name>`:

- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development)
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `test:integration`: Run only the integration tests (before run npm i -g newman to install newman)
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase

## Tech

The most important tecnologies used on this project can be found at: 

- [Node v10.13+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Joi](https://www.npmjs.com/package/joi)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [ESLint](https://www.npmjs.com/package/eslint)
