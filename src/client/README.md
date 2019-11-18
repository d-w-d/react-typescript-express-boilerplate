# Client Code

## Why two config files for typescript?

This dir has two typescript (tsc) config files: `tsconfig.json` and `webpack.config.ts`. Under the hood, webpack is just a node-script process. When we run webpack (to build the js bundle and run the dev server), we configure how webpack runs with the `webpack.config.ts` file. Since this file is written in typescript, we need to tell the typescript interpreter how to run when analyzing this file. This is done in the `_client_manager` script by setting the env variable `TS_NODE_PROJECT` to point to the the config file `src/client/tsconfig.webpack.json`. In other words, `tsconfig.webpack.json` configures the typescript interpreter (`./node_modules/.bin/tsc`) in order to run webpack itself.

As webpack runs, it will itself call a separate `tsc`-interpreter process in order to transpile our react source code (written in typescript) to javascript. The file `tsconfig.json` tells typescript what to do during that separate process.

The main difference between `webpack.config.json` and `tsconfig.json` is the `compilerOptions.module` property. In order to use typescript-path aliases in our code, we have to have `"module": "commonjs"` in our typescript json when running webpack. However, we want our transpiled javascript code to use `"module": "nextjs"` in order to enable tree-shaking.
