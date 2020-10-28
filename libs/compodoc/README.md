# Compodoc (Nx Plugin)

[![npm version](https://img.shields.io/npm/v/@twittwer/compodoc?style=flat-square)](https://www.npmjs.com/package/@twittwer/compodoc)
[![github action - release](https://img.shields.io/github/workflow/status/twittwer/nx-tools/Release?label=release&style=flat-square)](https://github.com/twittwer/nx-tools/actions?query=workflow%3ARelease)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](https://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Nx Plugin to integrate the generation of documentation with [Compodoc](https://compodoc.app/) in the [Nx workflow](https://nx.dev/angular).  
> NOTE: The whole generation part is done by [@compodoc/compodoc](https://github.com/compodoc/compodoc), this is just a wrapper plugin for Nx workspaces.

- [Installation](#installation)
- [Usage](#usage)
- [Schematics](#schematics)
- [Builder](#builder)
- [Recipes](#recipes)
  - [Workspace Docs](#workspace-docs)
  - [Watch Mode](#watch-mode)

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

## Schematics

Add Compodoc target to a project:

```
ng g @twittwer/compodoc:config <project> [options]
```

| Option        | Default | Description                                                                                                       |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| workspaceDocs | `false` | Will add a "tsconfig.compodoc.json" to the project that includes the whole workspace. ([Recipe](#workspace-docs)) |

## Builder

Generate Compodoc documentation for a project:

```
// HTML Format
ng run <project>:compodoc
// JSON Format
ng run <project>:compodoc:json
```

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
| unitTestCoverage      |                               | Path to unit test coverage in json-summary format.                                                            |
|                       |                               |                                                                                                               |
| serve                 | `false`                       | Serve generated documentation.                                                                                |
| port                  | `8080`                        | Port for serving of documentation (default: 8080).                                                            |
|                       |                               |                                                                                                               |
| watch                 | `false`                       | Watch for source files changes to automatically rebuild documentation.                                        |
|                       |                               |                                                                                                               |
| silent                | `true`                        | Suppress verbose build output.                                                                                |

> All paths should be relative to workspace root

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

> Compodoc of the whole workspace incl. all project READMEs (apps/libs) as additional documentation.

1. Create a library for shared/workspace wide tooling (e.g. `tools`)  
   `ng g @nrwl/(workspace|angular):library <project> [--unitTestRunner=none]`  
   `ng g @nrwl/workspace:library tools --unitTestRunner=none`
2. Optionally you can delete some unused code (you should keep at least `tsconfig.json` & `README.md`).
3. Configure Compodoc for the created project  
   `ng g @twittwer/compodoc:config <project> --workspaceDocs`  
   `ng g @twittwer/compodoc:config tools --workspaceDocs`
4. Generate your docs:  
   `ng run <project>:compodoc`  
   `ng run tools:compodoc`

### Watch Mode

> Rebuild your documentation on file changes during development.

The watch mode can be activated via argument:

```shell script
ng run <project>:compodoc --watch
ng run <project>:compodoc:json --watch
```

or via additional connfiguration:

```json5
configurations: {
  "json": {
    "exportFormat": "json"
  },
  "watch": {
    "watch": true
  },
  "json-watch": {
    "exportFormat": "json",
    "watch": true
  }
}
```

> Compodoc doesn't support watch mode while using JSON as export format ([#862](https://github.com/compodoc/compodoc/issues/862)).
> This scenario is handled by the use of [nodemon](https://github.com/remy/nodemon) to watch source files and rerun Compodoc on changes.
