# NxTools

[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Workspace for Nx Plugins.

| Project                         | Description                         |
| ------------------------------- | ----------------------------------- |
| [Compodoc](./packages/compodoc) | Compodoc executor for Nx workspaces |

## How to try changes locally?

To test changes in a local repository, the package can be published in a local registry:

1. `npm run local-registry start`
2. `npm run local-registry enable`
3. `npm login` (user: test, password: test, email: test@test.io)
4. commit your changes
5. `npx nx run compodoc:release:local`
6. run `npm i -D @twittwer/compodoc@latest` in your local test repository
