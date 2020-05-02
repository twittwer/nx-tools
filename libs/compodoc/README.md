# Compodoc (Nx Plugin)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Nx Plugin to integrate the generation of documentation with [Compodoc](https://compodoc.app/) in the [Nx workflow](https://nx.dev/angular).  
> NOTE: The whole generation part is done by [@compodoc/compodoc](https://github.com/compodoc/compodoc), this is just a wrapper plugin for Nx workspaces.

- [Installation](#installation)
- [Usage](#usage)
- [Builder Options](#builder-options)
- [Recipes](#recipes)
  - [Workspace Docs](#workspace-docs)

## Installation

Add the plugin to your Nx workspace:

```
ng add @twittwer/compodoc
// adds `@compdoc/compodoc` & `@twittwer/compodoc` as devDependencies
```

Configure Compodoc for a project:

```
ng g @twittwer/compodoc:config <project>
// adds a `compodoc` target to the specified project in your `angular.json`
```

## Usage

Generate Compodoc documentation for a project:

```
// HTML Format
ng run <project>:compodoc
// JSON Format
ng run <project>:compodoc:json
```

## Builder Options

The builder supports several configuration options which are passed to the Compodoc command.  
Additional options (used by the builder only) are indicated by an italic written option name.

> For more details you may have a look at the [original Compodoc documentation](https://compodoc.app/guides/options.html) or the [builder's schema.json](./src/builders/compodoc/schema.json)

| Option                | Default                       | Description                                                                                                   |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| tsConfig              | `<projectRoot>/tsconfig.json` | Path to project's TypeScript configuration file.                                                              |
| outputPath            | `dist/compodoc/<projectName>` | The output path of the generated files.                                                                       |
| exportFormat          | `html`                        | Format of generated documentation. (html, json - enables Compodoc's `minimal` mode as well)                   |
| _workspaceDocs_       | `false`                       | Use readme of workspace root as entry and add the readme files of all project as additional documentation.    |
|                       |                               |                                                                                                               |
| name                  | `<projectName>`               | Title of the documentation. (`workspaceDocs` uses workspace name as default - defined in `package.json`)      |
|                       |                               |                                                                                                               |
| includes              |                               | Path to external markdown files, folder should contain a `summary.json`. (`workspaceDocs` will override this) |
| includesName          |                               | Name of menu item containing external markdown files. (`workspaceDocs` uses "Projects" as default)            |
|                       |                               |                                                                                                               |
| disableCoverage       | `true`                        | Do not add the documentation coverage report.                                                                 |
| disableSourceCode     | `false`                       | Do not add source code tab and links to source code.                                                          |
| disableDomTree        | `false`                       | Do not add dom tree tab.                                                                                      |
| disableTemplateTab    | `false`                       | Do not add template tab.                                                                                      |
| disableStyleTab       | `false`                       | Do not add style tab.                                                                                         |
| disableGraph          | `false`                       | Disable rendering of the dependency graph.                                                                    |
| disablePrivate        | `true`                        | Do not show private in generated documentation.                                                               |
| disableProtected      | `false`                       | Do not show protected in generated documentation.                                                             |
| disableInternal       | `true`                        | Do not show @internal in generated documentation.                                                             |
| disableLifeCycleHooks | `true`                        | Do not show Angular lifecycle hooks in generated documentation.                                               |
| disableRoutesGraph    | `false`                       | Do not add the routes graph.                                                                                  |
| disableSearch         | `false`                       | Do not add the search input.                                                                                  |
| disableDependencies   | `false`                       | Do not add the dependencies list.                                                                             |
|                       |                               |                                                                                                               |
| language              | `en-US`                       | Language used for generated documentation.                                                                    |
| theme                 | `gitbook`                     | Theme used for generated documentation.                                                                       |
| hideGenerator         | `false`                       | Do not print the Compodoc logo at the bottom of the page.                                                     |
| customLogo            |                               | Path to custom logo.                                                                                          |
| customFavicon         |                               | Path to custom favicon.                                                                                       |
| extTheme              |                               | Path to external theme file.                                                                                  |
| templates             |                               | Path to directory of Handlebars templates to override built-in templates.                                     |
| assetsFolder          |                               | External assets folder to copy in generated documentation folder.                                             |
|                       |                               |                                                                                                               |
| serve                 | `false`                       | Serve generated documentation.                                                                                |
| port                  | `8080`                        | Port for serving of documentation (default: 8080).                                                            |
|                       |                               |                                                                                                               |
| silent                | `true`                        | Suppress verbose build output.                                                                                |

<details>
    <summary>How to configure the builder?</summary>
    
    The options can be defined in the `angular.json`:

    ```json5
    {
      projects: {
        '<project>': {
          architects: {
            compodoc: {
              builder: '@twittwer/compodoc:compodoc',
              options: {
                /* Define your options here */
              },
              configurations: {
                '<configuration name>': {
                  /* or here in case they are required based on specific conditions only. */
                },
              },
            },
          },
        },
      },
    }
    ```

</details>

## Recipes

### Workspace Docs

This recipe will describe how to create a Compodoc documentation including your whole workspace and listing the Readme files of all projects.

1. Create a library for shared/workspace wide tooling (e.g. `tools`)  
   `ng g @nrwl/workspace:library tools --unitTestRunner=none`
2. Configure Compodoc for the created project  
   `ng g @twittwer/compodoc:config tools`
3. Configure tsconfig to include the whole workspace  
   Therefore you can change the existing `tsconfig.lib.json` (by default the compodoc builder is using this file) or create a separate `tsconfig.compodoc.json`.  
   The important part is to change defined the file paths (include, exclude) in a way they are including all libs or the whole workspace.
   ```diff
   - "include": ["**/*.ts"]
   + "include": ["../**/*.ts"] // all libraries
   + "include": ["../../**/*.ts"] // whole workspace
   ```
   In case you created a new tsconfig it is necessary to update the Compodoc builder option (`tsConfig`) accordingly. (the new file should extend the existing ones)
4. Enable workspace mode for Compodoc builder to include the Readme files of all projects  
   Simply add `"workspaceDocs": true` in the builder's options.
   ```diff
   "compodoc": {
        "builder": "@twittwer/compodoc:compodoc",
        "options": {
            "tsConfig": "libs/tools/tsconfig.json",
            // ...
   +        "workspaceDocs": true
        },
   },
   ```
