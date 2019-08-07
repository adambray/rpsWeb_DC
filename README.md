# RPS Web - XP PPP Workshop Codebase

To get started (on Mac OS X):

1. Clone this codebase
1. Install *yarn* if you don't already have it: `brew install yarn`
1. Navigate into the `rps` subdirectory and run `yarn install`. (note: `npm install` may fail to resolve dependencies, so use yarn)

## Tests
1. Tests must be added to a `spec` directory in the `rps` directory.
1. To run tests from the command line, simply run `yarn test` in the `rps` directory.
1. To run tests from IntelliJ: 
   1. Install the *Node JS* plugin
   1. Go into the *Edit Configurations...* menu and edit the default settings for *Mocha*
   1. Under *Extra Mocha Options*, add: `--require babel-register`.
