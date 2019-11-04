# FalconAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Candidate comments

### Game

Please have in mind that, since I have troubles with making the provided webSockets to work on my side I've tried a bit different approach. I'm using localStorage instead in order to update the store in case of refreshing the page. Of course, this means that the game could be played in one tab/window. However, I've added a store (ngrx) to the project to show my ability to work with it and give you a hint of a similar way of using it in case that webSockets had been set and worked as expected.

### Testing

Replaced Jasmine with Jest for unit testing.
