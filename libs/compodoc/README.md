# compodoc

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Nx Plugin to integrate the generation of documentation with [Compodoc](https://compodoc.app/) in the [Nx workflow](https://nx.dev/angular).

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

## Configuration Options

The builder support several configuration options which are passed to Compodoc command.

> [Original documentation of Compodoc options](https://compodoc.app/guides/options.html)  
> (Defaults mainly correspond to the original default values - asterisks mark the exceptions)

| Option                | Default                       | Description                                                                                                   |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| tsConfig              | `<projectRoot>/tsconfig.json` | Path to project's TypeScript configuration file.                                                              |
| outputPath            | `dist/compodoc/<projectName>` | The output path of the generated files.                                                                       |
| exportFormat          | `html`                        | Output format (html, json - enables Compodoc's `minimal` mode as well).                                       |
| workspaceDocs         | `false`                       | Use readme of workspace root as entry and add the readme files of all project as additional documentation.    |
|                       |                               |                                                                                                               |
| name                  | `<projectName>`               | Title of the documentation.                                                                                   |
| language              | `en-US`                       | Language used for the generated documentation.                                                                |
|                       |                               |                                                                                                               |
| theme                 | `gitbook`                     | Theme used for the generated documentation.                                                                   |
| extTheme              |                               | Path to external theme file.                                                                                  |
| templates             |                               | Path to directory of Handlebars templates to override built-in templates.                                     |
|                       |                               |                                                                                                               |
| customLogo            |                               | Path to custom logo.                                                                                          |
| customFavicon         |                               | Path to custom favicon.                                                                                       |
| hideGenerator         | `false`                       | Do not print the Compodoc logo at the bottom of the page.                                                     |
|                       |                               |                                                                                                               |
| includes              |                               | Path to external markdown files, folder should contain a `summary.json`. (`workspaceDocs` will override this) |
| includesName          |                               | Name of menu item containing external markdown files. (Defaults to "Projects" in `workspaceDocs` mode)        |
|                       |                               |                                                                                                               |
| disableCoverage       | `true`\*                      | Do not add the documentation coverage report.                                                                 |
| disableSourceCode     | `false`                       | Do not add source code tab and links to source code.                                                          |
| disableDomTree        | `false`                       | Do not add dom tree tab.                                                                                      |
| disableTemplateTab    | `false`                       | Do not add template tab.                                                                                      |
| disableStyleTab       | `false`                       | Do not add style tab.                                                                                         |
| disableGraph          | `false`                       | Disable rendering of the dependency graph.                                                                    |
| disablePrivate        | `true`\*                      | Do not show private in generated documentation.                                                               |
| disableProtected      | `false`                       | Do not show protected in generated documentation.                                                             |
| disableInternal       | `true`\*                      | Do not show @internal in generated documentation.                                                             |
| disableLifeCycleHooks | `true`\*                      | Do not show Angular lifecycle hooks in generated documentation.                                               |
| disableRoutesGraph    | `false`                       | Do not add the routes graph.                                                                                  |
| disableSearch         | `false`                       | Do not add the search input.                                                                                  |
| disableDependencies   | `false`                       | Do not add the dependencies list.                                                                             |
|                       |                               |                                                                                                               |
| assetsFolder          |                               | External assets folder to copy in generated documentation folder.                                             |
|                       |                               |                                                                                                               |
| serve                 | `false`                       | Serve generated documentation.                                                                                |
| port                  | `8080`                        | Port for serving of documentation (default: 8080).                                                            |
|                       |                               |                                                                                                               |
| silent                | `true`\*                      | Suppress verbose build output.                                                                                |
|                       |                               |                                                                                                               |

> More details can be found in the builder's [schema.json](./src/builders/compodoc/schema.json).

### How to configure the builder?

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
              /* or here in case they are required under specific conditions only. */
            },
          },
        },
      },
    },
  },
}
```
