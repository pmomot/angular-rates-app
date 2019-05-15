# Rates app

App provides ability to see rates of different currencies.

- I've added unit tests just in several places due to time pressure (if needed you can check similar approach in my angular-weather-app repo)

_____________

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Architecture

## Modules

Angular applications are organised by `NgModules`. These modules abstract functionality,
isolate by domain, and allow explicit definition of dependencies.

Without sufficient structure, an application finds itself in an "everything depends on everything"
pattern – complicating maintenance and the ability to refactor.

Below is a list of the more specific modules used:

#### feature modules

A feature module is a group of functionality for a specific domain feature. This can be a shared module or part of
a parent module. An example is the `AppModule`.
```
app
├── components
│   └── app-components.module.ts
├── app.module.ts
├── app.component.scss
└── app.component.ts
```

#### Routing modules

A routing module is a feature module which has its own routes and is lazy-loaded. Routing modules are prefixed with
a `+` sign. This convention groups elements together in the editors tree, and communicates the way with which the module is loaded.
Routing modules contain a `-routing.module` to manage the routing. An example is the `RatesModule`.

```
+rates
├── components
│   └── rates-components.module.ts
├── containers
│   └── (smart components if needed)
├── resolvers
├── services
└── rates.module.ts
├── rates-routing.module.ts
└── rates-state.component.scss
└── rates-state.component.ts
```

## Services

Angular applications use `Injectables` to share logic with components, primarily to make these methods
reusable in other places. It is better to move as much logic as possible to feature
services to keep the component logic clean and to reduce the time necessary to make functionality
reusable when necessary.

Below is a list of the different services in use:

#### Feature services

Also known as the "sandbox" pattern.

Responsibility: Compose all logic and data exposed by core services, and prepare it for consumption by the feature.
Read more about [the sandbox pattern here](https://netmedia.io/dev/angular-architecture-patterns-detailed-project-architecture_5619)
and [here](https://blog.strongbrew.io/A-scalable-angular-architecture-part2/).

#### Data services

Responsibility: Abstract implementation details of API away from FE application.
These data services are grouped together by the `ApiModule`.

There should be no injected dependencies besides Angular's `HttpClient`, and other services defined within the `ApiModule`.

These services and their respective models are located in the `api` directory. Depending on the scope,
this might be in the root of the project or in the specific routing module.

#### Core services

Responsibility: Manage core application logic related to domain.

These services can both read from the Store, and contain logic related to a given domain model.

## Components

The bridge between logic and template is performed by Angular `Components`.
Components are differentiated based on the amount of logic and purpose.

Component directories contain all components shared throughout a module.

An `NgModule` declaring all these components is defined in the root of their directories.
These components are included in the `exports` array, describing they are free to be reused.

#### Simple Components

The bulk of app components are <b>dumb</b> which do not require any heavy logic out of a service. These often
contain `@Inputs` and/or `@Outputs` to interact with their parent component if applicable.

Most of the time the components make the bulk of a feature, but aside from that there may be many
shared components across the whole application. If responsibility of shared component is only ui, it is placed in shared `ui` folder.

#### Container Components

Container components are indicated whenever they import other services to avoid unnecessarily implementing and passing
of logic from a parent component - were not used in this app.

#### State Components

State components are the components which are parent components to other container- and simple components.
These components are often starting components for routes and contain most of the logic to manage state.

They often contain the _source of truth_ for these child components and the screen for the user.

## State

For state management `Ngrx` is used which is a state library specifically designed for Angular applications.
Ngrx uses the following pattern to write data in the store:

`Actions`, `Effects`, and `Reducers`.

For more information on Ngrx, check out [documentation](https://ngrx.io/docs).

#### Actions

Actions describe interactions with the store which can be called by other services. Every action has
an initial request, after which there is a `Done` and `Failed` action after it resolves.

Whenever `GetAllSymbols` is called, a method will check if it returns a proper response or
if it returns an error, prompting the relevant `GetAllSymbolsDone` or `GetAllSymbolsFailed`
to resolve.

#### Effects

`Effects` listen if a specific Type `Action` is being called and executes respective logic.

In the instance of `rates`, whenever the `GetAllSymbols` is called, it will retrieve the data
through the `RatesDataService`. The `GetAllSymbolsDone` gets called if it retrieves a valid response,
and else the `GetAllSymbolsFailed` will be called.

```
@Effect()
symbols$ = this.actions$.pipe(
  ofType(RatesActions.GetAllSymbols),
  switchMap(() =>
    this.ratesDataService.getAllSymbols().pipe(
      map(data => new GetAllSymbolsDone(data)),
      catchError(error => of(new GetAllSymbolsFailed(error)))
    )
  )
);
```

#### Reducers

The `Reducer` handles the writing of data in the store. Whereas the normal action `GetAllSymbols` tries
to fetch the data, a reducer method listens to the actions to update the state accordingly.

Here the `rates` reducer updates or adds new entries to the state whenever `GetAllSymbolsDone` is executed.

```
case RatesActions.GetAllSymbolsDone: {
      return {
        ...state,
        symbols: action.payload,
        loading: false
      };
    }
```
