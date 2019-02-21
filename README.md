# Epic User CRUD

## Starting the Service and Browser Application

First you will need to start the services from the `epic-web-test` project:

`yarn start`
`yarn watch-service`

You'll need to install the dependencies in this project with `yarn` or `npm install`.

There are two services to start to use the Epic User CRUD application:

`yarn start:apollo`
Starts the Apollo Server for executing GraphQL queries. The front-end CRUD application is dependent on this service!

`yarn start`
Starts the create-react-app dev environment and spins up a development version of the front-end application. By default the CRUD application points to port `4001` for executing GraphQL queries.

## User Experience and Front-End Design Considerations

My main goals were to make a responsive, intuitive user CRUD application that works with a GraphQL backend.

### React

With React it is easy to create re-useable web components to make single page applications. I find the unidirectional data flow and component lifecycle easy to learn and follow. React provides easy component state management and there's thousands of first or third party packages to extend its behavior.

Specifically I wanted to use React 16 and give hooks a try. I found they were a simple way to keep my components as functional and still have local component state.

### GraphQL

While it I do believe it is overkill for such a simple API, I wanted to use GraphQL as an example on its power in data fetching and leverage the UI and UX benefits from Apollo's tooling.

With GraphQL data fetching over APIs is optimized by only fetching the data you need.

### Apollo Server

Apollo Server provides an easy way to spin up a "Front-End Back-End" GraphQL service. This allows the front-end developer to design their own API for their front-end applications to use. It also means that only one endpoint is exposed to client applications which implementing data fetching and security into them.

Apollo Server makes it easy to add monitoring and caching for GraphQL requests and plugs in easily with Apollo Client.

#### Playground

When you run `yarn start:apollo`, or `node ./apollo-server/index.js` from the root of the application, the Apollo Server GraphQL service spins up and provides an interactive playground for exploring your API. If you go to `http://localhost:4001` while its running you can execute GraphQL queries and mutations in the playground. I find this interactivity a great learning tool while front-end developers, or any API consumers, to understand what your API is capable of.

### Apollo Client

Apollo Client is the front-end piece of the GraphQL tooling for this project. Apollo Client provides has implementations that plug in easily with React by providing a component for executing GraphQL queries and passing the results as props to your component tree.

Results from queries and mutations are shaped just as you requested them, meaning the developer's implementation defines the shape of the response. This naturally plugs into react as props!

Apollo Client also provides built in global state management (similar to redux), caching, and composable networking!

#### Optimistic UI

An optimistic UI is one that updates the frontend state of the application to represent the the backend before requests are completed. This gives the application a snappy, responsive feel.

## State Management

My goal for state management was to leverage local component state as much as possible. I avoided things like redux, unstated, and apollo-link-state intentionally. With Apollo Client there is a way to keep state in its cache, which you can query for just like any other GraphQL resource. I've got experience for all of these state managment tools, but felt that the application was simple enough to avoid using them!

## Styling

I wanted to make sure the application was responsive, had some animations, and was nice to look at.

### Responsive

The application provides the same experience on any size screen. This was implemented using simple percent-based CSS widths only. I've had experience using grid systems and media queries.

### Modern Font Stack

The application uses the "modern font stack", which means it uses built-in system fonts. Fonts are some of the largest resources many applications request. Using system fonts saves the cost of fetching these fonts, and also gives the application a "native" feel.

### `@emotion` and Styled Components

There's a lot of ways to do CSS with React components, but I opted for `@emotion/styled` which has a similar API to `styled-components`. This provides an easy API for creating web components with style that can be composed with other components as you would expect.

It also comes with some other css style helpers for writing styles in CSS but still being able to inject them into the `style` prop of components.

## TODO

- Tests
  - In general I write tests for every single component I wrote, typically using:
    - jest for test running and creating component snapshots.
    - enzyme for rendering components and inspecting their lifecycles.
    - webdriver.io for end-to-end browser testing.
- Validation
  - The forms for editing and adding contacts need validation for each of their fields
    - Name is required
    - Birthday should be a valid date
    - Email should be a valid email address
- Animations
  - More animations to give feedback to the user on how the application is changing its state.
    - When modal closes
    - When user is deleted and the list shuffles
