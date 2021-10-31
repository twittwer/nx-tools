# Compodoc (Nx Plugin)

[![npm version](https://img.shields.io/npm/v/@twittwer/compodoc?style=flat-square)](https://www.npmjs.com/package/@twittwer/compodoc)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](https://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> [Nx Plugin](https://nx.dev/core-concepts/nx-devkit) to generate documentation via [Compodoc](https://compodoc.app/).  
> NOTE: The whole generation part is done by [@compodoc/compodoc](https://github.com/compodoc/compodoc), this is just a wrapper plugin for [Nx workspaces](https://nx.dev/).

- [Getting Started](#getting-started)
- [Generator](#generator)
- [Executor](#executor)
- [Recipes](#recipes)
  - [Workspace Docs](#workspace-docs)
  - [Watch Mode](#watch-mode)
  - [Integration with @nrwl/storybook](#integration-with-nrwlstorybook)

## Getting Started

Add the plugin to your Nx workspace:

```
npm install --save-dev @twittwer/compodoc
```

Configure Compodoc for a project:

```shell script
nx g @twittwer/compodoc:config <project>
# adds a `compodoc` target to the specified project
# ensures `@compodoc/compodoc` as devDependencies
```

Run `nx run <project>:compodoc --serve` and go to [http://localhost:8080/](http://localhost:8080/)

## Generator

Add Compodoc target to a project:

```
nx g @twittwer/compodoc:config <project> [options]
```

| Option        | Default | Description                                                                                                                    |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| workspaceDocs | `false` | Will add a "tsconfig.compodoc.json" to the project that includes the whole workspace. [Workspace Docs Recipe](#workspace-docs) |

## Executor

Generate Compodoc documentation for a project:

```shell script
# HTML Format
nx run <project>:compodoc
# JSON Format
nx run <project>:compodoc:json
```

The executor supports several configuration options that are passed to the Compodoc command.  
Additional options (used exclusively by the executor) are indicated by an italic written option name.

> For more details you may have a look at the [original Compodoc documentation](https://compodoc.app/guides/options.html) or the [builder's schema.json](./src/builders/compodoc/schema.json)

| Option                | Default                              | Description                                                                                                   |
| --------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| tsConfig              | `<projectRoot>/tsconfig.json`        | Path to project's tsconfig file.                                                                              |
| outputPath            | `dist/compodoc/<projectName>`        | The output path of the generated files.                                                                       |
| exportFormat          | `html`                               | Format of generated documentation. (html, json - enables Compodoc's `minimal` mode as well)                   |
| _workspaceDocs_       | `false`                              | Use readme of workspace root as entry and add the readme files of all project as additional documentation.    |
|                       |                                      |                                                                                                               |
| name                  | `<projectName>`                      | Title of the documentation. (`workspaceDocs` uses workspace name as default - defined in `package.json`)      |
|                       |                                      |                                                                                                               |
| includes              |                                      | Path to external markdown files, folder should contain a `summary.json`. (`workspaceDocs` will override this) |
| includesName          |                                      | Name of menu item containing external markdown files. (`workspaceDocs` uses "Projects" as default)            |
|                       |                                      |                                                                                                               |
| assetsFolder          |                                      | External assets folder to copy in generated documentation folder.                                             |
| unitTestCoverage      |                                      | Path to unit test coverage in json-summary format.                                                            |
|                       |                                      |                                                                                                               |
| disableCoverage       | `true`                               | Do not add the documentation coverage report.                                                                 |
| disableSourceCode     | `false`                              | Do not add source code tab and links to source code.                                                          |
| disableDomTree        | `false`                              | Do not add dom tree tab.                                                                                      |
| disableTemplateTab    | `false`                              | Do not add template tab.                                                                                      |
| disableStyleTab       | `false`                              | Do not add style tab.                                                                                         |
| disableGraph          | `false`                              | Disable rendering of the dependency graph.                                                                    |
| disablePrivate        | `true`                               | Do not show private in generated documentation.                                                               |
| disableProtected      | `false`                              | Do not show protected in generated documentation.                                                             |
| disableInternal       | `true`                               | Do not show @internal in generated documentation.                                                             |
| disableLifeCycleHooks | `true`                               | Do not show Angular lifecycle hooks in generated documentation.                                               |
| disableRoutesGraph    | `false`                              | Do not add the routes graph.                                                                                  |
| disableSearch         | `false`                              | Do not add the search input.                                                                                  |
| disableDependencies   | `false`                              | Do not add the dependencies list.                                                                             |
|                       |                                      |                                                                                                               |
| language              | `en-US`                              | Language used for generated documentation.                                                                    |
| theme                 | `gitbook`                            | Theme used for generated documentation.                                                                       |
| extTheme              |                                      | Path to external theme file.                                                                                  |
| templates             |                                      | Path to directory of Handlebars templates to override built-in templates.                                     |
| customLogo            |                                      | Path to custom logo.                                                                                          |
| customFavicon         |                                      | Path to custom favicon.                                                                                       |
| hideGenerator         | `false`                              | Do not print the Compodoc logo at the bottom of the page.                                                     |
|                       |                                      |                                                                                                               |
| serve                 | `false` (`true` in watch mode)       | Serve generated documentation. (_automatically enabled in watch mode_)                                        |
| port                  | `8080`                               | Port for serving of documentation.                                                                            |
| watch                 | `false`                              | Watch for source files changes to automatically rebuild documentation.                                        |
| silent                | `true` (`false` in watch/serve mode) | Suppress verbose build output.                                                                                |
|                       |                                      |                                                                                                               |
| _debug_               | `false`                              | Log resulting executor options & the final Compodoc command with all arguments.                               |

> All paths should be relative to workspace root

<details>
<summary>How to configure an executor?</summary>

The target definition can be found in `angular.json`/`workspace.json` in the workspace root or `project.json` in the project directory:

<!-- prettier-ignore-start -->
```json5
{
  "targets": {
    "compodoc": {
      "executor": "@twittwer/compodoc:compodoc",
      "options": { /* Define your common options here */ },
      "configurations": {
        "<configuration name>": { /* and provide use case specific options via configurations. */ }
      }
    }
  }
}
```
<!-- prettier-ignore-end -->

</details>

## Recipes

### Workspace Docs

> Documentation for the whole workspace incl. the README files of all projects (apps/libs) as additional documentation.

- Create a library for shared/workspace wide tooling (e.g. `workspace`)  
  `nx g @nrwl/workspace:library workspace --unitTestRunner=none`
- Optionally you can delete some unused code (you should keep at least `tsconfig.json` & `README.md`).
- Configure Compodoc for the created project  
  `nx g @twittwer/compodoc:config workspace --workspaceDocs`
- Generate your docs:  
  `nx run workspace:compodoc`

### Watch Mode

> Rebuild your documentation on file changes during development.

The watch mode can be activated via argument:

```shell script
nx run <project>:compodoc --watch # watch mode automatically enables serving
nx run <project>:compodoc:json --watch
```

or via explicit configuration:

<!-- prettier-ignore-start -->
```json5
{
  "targets": {
    "compodoc": {
      "executor": "@twittwer/compodoc:compodoc",
      "options": { /* Define your common options here */ },
      "configurations": {
        "serve": { "watch": true }, /* watch mode automatically enables serving */
        "json": { "exportFormat": "json" },
        "json.watch": { "exportFormat": "json", "watch": true }
      }
    }
  }
}
```
<!-- prettier-ignore-end -->

### Integration with @nrwl/storybook

At first you have to configure `@nrwl/storybook` & `@twittwer/compodoc` for the project.  
Wrap `storybook` & `build-storybook` targets with a `@nrwl/workspace:run-commands` executor:

<details>
<summary>Option 1: `storybook` / `storybook:build` (1 target with configuration)</summary>

<!-- prettier-ignore-start -->
```json5
{
  "targets": {
    "_storybook": { /* @nrwl/storybook */ },
    "_build-storybook": {  /* @nrwl/storybook */ },
    "compodoc": { /* @twittwer/compodoc */ },
    "storybook": {
      "executor": "@nrwl/workspace:run-commands",
      "options": {
        "commands": [
          "npx nx run <project>:compodoc:json --watch",
          "npx nx run <project>:_storybook"
        ],
        "parallel": true
      },
      "configurations": {
        "build": {
          "commands": [
            "npx nx run <project>:compodoc:json",
            "npx nx run <project>:_build-storybook"
          ],
          "parallel": false
        }
      }
    }
  }
}
```
<!-- prettier-ignore-end -->

</details>

<details>
<summary>Option 2: `storybook` / `build-storybook` (2 targets)</summary>

<!-- prettier-ignore-start -->
```json5
{
  "targets": {
    "_storybook": { /* @nrwl/storybook */ },
    "_build-storybook": {  /* @nrwl/storybook */ },
    "compodoc": { /* @twittwer/compodoc */ },
    "storybook": {
      "executor": "@nrwl/workspace:run-commands",
      "options": {
        "commands": [
          "npx nx run <project>:compodoc:json --watch",
          "npx nx run <project>:_storybook"
        ],
        "parallel": true
      }
    },
    "build-storybook": {
      "executor": "@nrwl/workspace:run-commands",
      "options": {
        "commands": [
          "npx nx run <project>:compodoc:json",
          "npx nx run <project>:_build-storybook"
        ],
        "parallel": false
      }
    }
  }
}
```
<!-- prettier-ignore-end -->

</details>

Configure Storybook Docs in `libs/<project>/.storybook/preview.js`:

```js
import { setCompodocJson } from '@storybook/addon-docs/angular';
import compodocJson from '../../../dist/compodoc/<project>/documentation.json';

setCompodocJson(compodocJson);
```

Serve or build it:

```shell script
# Option 1
nx run <project>:storybook
nx run <project>:storybook:build
# Option 2
nx run <project>:storybook
nx run <project>:build-storybook
```
