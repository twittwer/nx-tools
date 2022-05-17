# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.8.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.7.0...compodoc/v1.8.0) (2022-05-17)


### Features

* update to Nx 14 ([3b8506c](https://github.com/twittwer/nx-tools/commit/3b8506cee6f077e22b6112c2fec30889e05f1445))



# [1.7.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.6...compodoc/v1.7.0) (2022-04-03)

### Features

- use always relative paths ([38ecc72](https://github.com/twittwer/nx-tools/commit/38ecc722ef6d96b8a1a29a103f9de5b281387aee)), closes [#63](https://github.com/twittwer/nx-tools/issues/63)

## [1.6.6](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.5...compodoc/v1.6.6) (2021-12-15)

### Bug Fixes

- ensure consistent root based working directory ([4471710](https://github.com/twittwer/nx-tools/commit/44717101fec66d59268812e5f69773abb628ec7e))
- execute compodoc via node_modules instead of package manager ([ee0e7fb](https://github.com/twittwer/nx-tools/commit/ee0e7fba5fd8f7d40e5fbfcefd5dc03690e4b510)), closes [#56](https://github.com/twittwer/nx-tools/issues/56)

# 0.1.0 (2021-12-15)

### Bug Fixes

- add compodoc to cachable operations [#54](https://github.com/twittwer/nx-tools/issues/54) ([d010072](https://github.com/twittwer/nx-tools/commit/d01007227519eab8532cfb80ca45342747d6f174))
- add missing package.json configuration ([0698418](https://github.com/twittwer/nx-tools/commit/0698418e6d849da59d60ab1ace900a6abf837e62))
- deduplicate includes in tsconfig of workspace docs ([bf76ae4](https://github.com/twittwer/nx-tools/commit/bf76ae43c079abbdbd3b26bac2ac687588b8652d))
- ensure public package access ([ce69c71](https://github.com/twittwer/nx-tools/commit/ce69c71be069759d299cc96900e8a085e724fc59))
- ensure public version access ([d4ba25a](https://github.com/twittwer/nx-tools/commit/d4ba25a98a6a37130dcda6900c6a7170281ebfb7))
- wrap compodoc watch with nodemon for workspace docs ([a87844e](https://github.com/twittwer/nx-tools/commit/a87844e9c870a753d76169c001eb86a4509f07f6))

### Features

- add debug option to log resulting options & compodoc command ([dd8b6de](https://github.com/twittwer/nx-tools/commit/dd8b6de8edc556b6652aebc8cae96a36e7ac2917))
- ensure compodoc installation during project configuration ([ecb83e3](https://github.com/twittwer/nx-tools/commit/ecb83e36539014483ba0f9d1f9884884135e773a))
- rewrite compodoc executor (standalone config & watch mode support) ([29fb34c](https://github.com/twittwer/nx-tools/commit/29fb34cd49ad6f14087ec5c727f0c754dc4f05ae))
- rewrite compodoc generator (standalone config) ([122d772](https://github.com/twittwer/nx-tools/commit/122d772057aa7ccce385d5069d182414cf7cd9ff))

## [1.6.5](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.4...compodoc/v1.6.5) (2021-11-14)

### Bug Fixes

- add compodoc to cachable operations [#54](https://github.com/twittwer/nx-tools/issues/54) ([d010072](https://github.com/twittwer/nx-tools/commit/d01007227519eab8532cfb80ca45342747d6f174))

## [1.6.4](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.3...compodoc/v1.6.4) (2021-10-31)

### Bug Fixes

- wrap compodoc watch with nodemon for workspace docs ([a87844e](https://github.com/twittwer/nx-tools/commit/a87844e9c870a753d76169c001eb86a4509f07f6))

## [1.6.3](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.2...compodoc/v1.6.3) (2021-10-31)

### Bug Fixes

- ensure public package access ([ce69c71](https://github.com/twittwer/nx-tools/commit/ce69c71be069759d299cc96900e8a085e724fc59))

## [1.6.2](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.1...compodoc/v1.6.2) (2021-10-31)

### Bug Fixes

- add missing package.json configuration ([0698418](https://github.com/twittwer/nx-tools/commit/0698418e6d849da59d60ab1ace900a6abf837e62))

## [1.6.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.6.0...compodoc/v1.6.1) (2021-10-31)

### Bug Fixes

- ensure public version access ([d4ba25a](https://github.com/twittwer/nx-tools/commit/d4ba25a98a6a37130dcda6900c6a7170281ebfb7))

## [1.6.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.5.3...compodoc/v1.6.0) (2021-10-31)

### Bug Fixes

- deduplicate includes in tsconfig of workspace docs ([bf76ae4](https://github.com/twittwer/nx-tools/commit/bf76ae43c079abbdbd3b26bac2ac687588b8652d))

### Features

- add debug option to log resulting options & compodoc command ([dd8b6de](https://github.com/twittwer/nx-tools/commit/dd8b6de8edc556b6652aebc8cae96a36e7ac2917))
- ensure compodoc installation during project configuration ([ecb83e3](https://github.com/twittwer/nx-tools/commit/ecb83e36539014483ba0f9d1f9884884135e773a))
- rewrite compodoc executor (standalone config & watch mode support) ([29fb34c](https://github.com/twittwer/nx-tools/commit/29fb34cd49ad6f14087ec5c727f0c754dc4f05ae))
- rewrite compodoc generator (standalone config) ([122d772](https://github.com/twittwer/nx-tools/commit/122d772057aa7ccce385d5069d182414cf7cd9ff))

## [1.5.3](https://github.com/twittwer/nx-tools/compare/compodoc/v1.5.2...compodoc/v1.5.3) (2021-05-20)

### Bug Fixes

- **compodoc:** escape spawn command & args to handle spaces in path ([22fc859](https://github.com/twittwer/nx-tools/commit/22fc8592ad3fdb50f6d2311695cf08d6951ab7ca)), closes [#39](https://github.com/twittwer/nx-tools/issues/39)

## [1.5.2](https://github.com/twittwer/nx-tools/compare/compodoc/v1.5.1...compodoc/v1.5.2) (2021-05-20)

### Bug Fixes

- **compodoc:** prefer app's tsconfig.editor in favour of tsconfig.app ([76b5f91](https://github.com/twittwer/nx-tools/commit/76b5f9162ecd170d7e5410da043d322c277189f7))
- **compodoc:** replace deprecated id property with $id [#37](https://github.com/twittwer/nx-tools/issues/37) ([4efce80](https://github.com/twittwer/nx-tools/commit/4efce8061b0ac26dfe9ccc6a2cd5bd8b07abc8ca))
- **compodoc:** windows path normalization [#31](https://github.com/twittwer/nx-tools/issues/31) ([7c32208](https://github.com/twittwer/nx-tools/commit/7c32208a90ed4d44e88437f22628d52d8826c650))

### Chores

- migrate to Nx 12 & update other dependencies ([ccf04a7](https://github.com/twittwer/nx-tools/commit/ccf04a7bcfa8fe8ab1e2c69b3336624387eb1028))

### Continuous Integration

- **compodoc:** temporarily disable config schematic tests ([feab415](https://github.com/twittwer/nx-tools/commit/feab415b0cb9f4b3cbc1cc717f19e079d3423443))

### Documentation

- **compodoc:** ensure JSON syntax in samples ([d4218c8](https://github.com/twittwer/nx-tools/commit/d4218c82066fb6a659253a331c7d6a64b105cd6c))

### Miscellaneous

- Merge pull request #38 from twittwer/update-nx-12 ([a846eb1](https://github.com/twittwer/nx-tools/commit/a846eb11476a8d1c679100121a9a56af33947acb)), closes [#38](https://github.com/twittwer/nx-tools/issues/38)
- Merge pull request #26 from HaveF/patch-1 ([897211e](https://github.com/twittwer/nx-tools/commit/897211e6fbfe776f9d00a9fef2f3cc7d080b238d)), closes [#26](https://github.com/twittwer/nx-tools/issues/26)
- typo ([fa9441f](https://github.com/twittwer/nx-tools/commit/fa9441ff8b9fe52c7c58ed1bf5769c88172e9077))

## [1.5.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.5.0...compodoc/v1.5.1) (2020-10-29)

### Bug Fixes

- disable next distribution channel ([7783a45](https://github.com/twittwer/nx-tools/commit/7783a45c64f8e7d273737d9973d911ea81654313))

### Miscellaneous

- Merge pull request #24 from twittwer/next ([7120c5c](https://github.com/twittwer/nx-tools/commit/7120c5c4cbbd152a145cea31711098f09c18024c)), closes [#24](https://github.com/twittwer/nx-tools/issues/24)

# [1.5.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.4.0...compodoc/v1.5.0) (2020-10-28)

### Documentation

- **compodoc:** add watch mode recipe with storybook integration ([479e45b](https://github.com/twittwer/nx-tools/commit/479e45bdbf84476b576324010b884d9cac94a72d)), closes [#21](https://github.com/twittwer/nx-tools/issues/21)
- **compodoc:** replace ng with nx command ([80e3715](https://github.com/twittwer/nx-tools/commit/80e371597645a125466cb087fc8dffbbd45cfc03))

### Features

- **compodoc:** add watch mode ([#21](https://github.com/twittwer/nx-tools/issues/21)) ([427e317](https://github.com/twittwer/nx-tools/commit/427e31761210bd55dde684e41abc64a5ef7c3649))

# [1.4.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.3.2...compodoc/v1.4.0) (2020-10-22)

### Chores

- update @type/node to latest LTS 12.19.1 ([#20](https://github.com/twittwer/nx-tools/issues/20)) ([cbb00b1](https://github.com/twittwer/nx-tools/commit/cbb00b1ffdc93a27395e09d4e761d595aba45cf7))

### Features

- **compodoc:** add watch mode ([#21](https://github.com/twittwer/nx-tools/issues/21)) ([2c3c94b](https://github.com/twittwer/nx-tools/commit/2c3c94bafc3c4dd2d73849a98440ea5007be01e5))

### Miscellaneous

- Merge pull request #18 from twittwer/dependabot/npm_and_yarn/http-proxy-1.18.1 ([d96fb0b](https://github.com/twittwer/nx-tools/commit/d96fb0be0ac29ed034d278dccc16f9c01810ac46)), closes [#18](https://github.com/twittwer/nx-tools/issues/18)
- Merge pull request #17 from twittwer/dependabot/npm_and_yarn/elliptic-6.5.3 ([a9a82f5](https://github.com/twittwer/nx-tools/commit/a9a82f5277d249e9d5f63cb249c21c0e6599e464)), closes [#17](https://github.com/twittwer/nx-tools/issues/17)

## [1.3.2](https://github.com/twittwer/nx-tools/compare/compodoc/v1.3.1...compodoc/v1.3.2) (2020-07-30)

### Bug Fixes

- **compodoc:** ensure paths relative to execution directory ([1e41a1e](https://github.com/twittwer/nx-tools/commit/1e41a1eae0000567c776fa015b88e7e2e119c664)), closes [#16](https://github.com/twittwer/nx-tools/issues/16)

### Documentation

- **compodoc:** document unitTestCoverage option ([0a32747](https://github.com/twittwer/nx-tools/commit/0a32747a44e19e9e4dae8197ee3d83fc6d630567))

## [1.3.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.3.0...compodoc/v1.3.1) (2020-06-10)

### Bug Fixes

- **compodoc:** use shell to fix compodoc spawn on windows ([9fb51ad](https://github.com/twittwer/nx-tools/commit/9fb51ad9ea91d2318a4db578754224862422868c)), closes [#11](https://github.com/twittwer/nx-tools/issues/11)

### Chores

- **compodoc:** release 1.3.1-alpha.1 ([4a8604e](https://github.com/twittwer/nx-tools/commit/4a8604ec68992cf9b4fb4e852be85863dcd2e8f8)), closes [#11](https://github.com/twittwer/nx-tools/issues/11) [#13](https://github.com/twittwer/nx-tools/issues/13)

### Miscellaneous

- Merge pull request #15 from twittwer/alpha ([a0a7049](https://github.com/twittwer/nx-tools/commit/a0a7049620ac2969e6673cf625a2e5c6dc70c53a)), closes [#15](https://github.com/twittwer/nx-tools/issues/15)
- Merge pull request #13 from twittwer/dependabot/npm_and_yarn/websocket-extensions-0.1.4 ([1e6b8a9](https://github.com/twittwer/nx-tools/commit/1e6b8a99b231c3946c24d0e527e7130152a3d694)), closes [#13](https://github.com/twittwer/nx-tools/issues/13)

## [1.3.1-alpha.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.3.0...compodoc/v1.3.1-alpha.1) (2020-06-10)

### Bug Fixes

- **compodoc:** use shell to fix compodoc spawn on windows ([9fb51ad](https://github.com/twittwer/nx-tools/commit/9fb51ad9ea91d2318a4db578754224862422868c)), closes [#11](https://github.com/twittwer/nx-tools/issues/11)

### Miscellaneous

- Merge pull request #13 from twittwer/dependabot/npm_and_yarn/websocket-extensions-0.1.4 ([1e6b8a9](https://github.com/twittwer/nx-tools/commit/1e6b8a99b231c3946c24d0e527e7130152a3d694)), closes [#13](https://github.com/twittwer/nx-tools/issues/13)

# [1.3.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.2.0...compodoc/v1.3.0) (2020-06-10)

### Features

- **compodoc:** add --unitTestCoverage flag support ([0f298e2](https://github.com/twittwer/nx-tools/commit/0f298e2ab15c9a6de98f69055f4775609293d956))

### Miscellaneous

- Merge pull request #14 from StalkAltan/as/feat/add-unit-test-coverage-option ([b4f4bd0](https://github.com/twittwer/nx-tools/commit/b4f4bd093a912c6e61a7727931be3172eb410e56)), closes [#14](https://github.com/twittwer/nx-tools/issues/14)

# [1.2.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.1.1...compodoc/v1.2.0) (2020-05-13)

### Build System

- add version injection in release process ([442e889](https://github.com/twittwer/nx-tools/commit/442e889c42d923e59e510b8f2d21d8775d3f2495))

### Chores

- pin dependencies ([f26fcb7](https://github.com/twittwer/nx-tools/commit/f26fcb786807c04ee344a68e6fb10e764f779b6a))

### Features

- **compodoc:** add specific version numbers during ng-add ([faf60fc](https://github.com/twittwer/nx-tools/commit/faf60fc8ecd2df2e3e093d66da409c83fe55ee9c))
- **compodoc:** execute ng-add implicitly during config schematic ([e1abce0](https://github.com/twittwer/nx-tools/commit/e1abce07ece9ca7250ec4b1770b5a6a4d0af72bb))

### Miscellaneous

- Merge branch 'beta' ([df87637](https://github.com/twittwer/nx-tools/commit/df876370f7c8a59cf6e51e4b13f4a92807808e2b))

### Tests

- **compodoc:** improve unit tests for config schematic ([84a2a18](https://github.com/twittwer/nx-tools/commit/84a2a1825c54e6fdd4b56d6fcf825909462cc5f4))

## [1.1.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.1.0...compodoc/v1.1.1) (2020-05-05)

### Code Refactoring

- **compodoc:** improve testability of schematics ([5d46bcd](https://github.com/twittwer/nx-tools/commit/5d46bcdbfa3fdc233b5d3c312f33663e07b60c23))

### Continuous Integration

- add tests to release process ([e90b29b](https://github.com/twittwer/nx-tools/commit/e90b29b133523d8718835afd26d9ff98e4fa4283))

### Tests

- **compodoc:** add unit tests for config schematic ([cc84362](https://github.com/twittwer/nx-tools/commit/cc84362a33665aa35c6d418880daf29ebd1ee23d))
- **compodoc:** add unit tests for ng-add schematic ([16eb2e0](https://github.com/twittwer/nx-tools/commit/16eb2e0f12246650c7a481c1c1ef3a9ade5d7af6))

# [1.1.0](https://github.com/twittwer/nx-tools/compare/compodoc/v1.0.2...compodoc/v1.1.0) (2020-05-04)

### Features

- **compodoc:** add schematic option for workspaceDocs ([2942d09](https://github.com/twittwer/nx-tools/commit/2942d09605ccc9936277dfe39ca7f723ef7c6cfc)), closes [#9](https://github.com/twittwer/nx-tools/issues/9)

## [1.0.2](https://github.com/twittwer/nx-tools/compare/compodoc/v1.0.1...compodoc/v1.0.2) (2020-05-03)

### Chores

- **compodoc:** release 1.0.2-beta.1 ([1800ce1](https://github.com/twittwer/nx-tools/commit/1800ce1a6bfacbbe64ea4e17b9294e7c302121ef))
- remove unused yarn.lock ([32ba144](https://github.com/twittwer/nx-tools/commit/32ba14428460fd00c11494b3b8a8753858f9308d))

### Code Refactoring

- **compodoc:** cleanup schematic definition ([ba59e6d](https://github.com/twittwer/nx-tools/commit/ba59e6dab8de0ef6d3e6011b6fac82e4bde281ba))

### Documentation

- **compodoc:** add more badges ([097c97b](https://github.com/twittwer/nx-tools/commit/097c97b009857b61660f70035dcaec55c8f6da79))

### Miscellaneous

- Merge branch 'beta' ([c590cde](https://github.com/twittwer/nx-tools/commit/c590cde3886e5866e10d7c7e42dd1ac7109c1a1a))

## [1.0.2-beta.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.0.1...compodoc/v1.0.2-beta.1) (2020-05-03)

### Chores

- remove unused yarn.lock ([32ba144](https://github.com/twittwer/nx-tools/commit/32ba14428460fd00c11494b3b8a8753858f9308d))

### Code Refactoring

- **compodoc:** cleanup schematic definition ([ba59e6d](https://github.com/twittwer/nx-tools/commit/ba59e6dab8de0ef6d3e6011b6fac82e4bde281ba))

### Documentation

- **compodoc:** add more badges ([097c97b](https://github.com/twittwer/nx-tools/commit/097c97b009857b61660f70035dcaec55c8f6da79))

## [1.0.1](https://github.com/twittwer/nx-tools/compare/compodoc/v1.0.0...compodoc/v1.0.1) (2020-05-02)

### Bug Fixes

- **compodoc:** use node fs for file existence check ([c987daa](https://github.com/twittwer/nx-tools/commit/c987daaa9002dc386527e02ee63e500617985e6a))

### Documentation

- **compodoc:** add kudos to [@compodoc](https://github.com/compodoc) ([7c9cbf1](https://github.com/twittwer/nx-tools/commit/7c9cbf1bd1a747ee5a7668bf945d7a3a3701b7bb))

# 1.0.0 (2020-05-02)

### Bug Fixes

- **compodoc:** check for existence of tsconfig file ([8ef7ae2](https://github.com/twittwer/nx-tools/commit/8ef7ae2d1a1b0977f7050c933e0b40893a4a46f5))
- **compodoc:** install plugin as devDependency during ng-add ([32f5cea](https://github.com/twittwer/nx-tools/commit/32f5ceacf538f59ba2d675da944174d3cef6539e)), closes [#5](https://github.com/twittwer/nx-tools/issues/5)

### Chores

- **compodoc:** configure semantic-release for compodoc ([323e27b](https://github.com/twittwer/nx-tools/commit/323e27bc92aac5ef4657c9c058a17ff5f20816ba))
- cleanup workspace ([8efb90f](https://github.com/twittwer/nx-tools/commit/8efb90f8189a93e5f99ad6e34471ecb60856ae56))

### Continuous Integration

- add ci tests for pull requests ([a7e3372](https://github.com/twittwer/nx-tools/commit/a7e33727db44c4d64be57a3c0705dceb7fd05942))
- configure commitlint with commitizen ([bfb6921](https://github.com/twittwer/nx-tools/commit/bfb6921f935c9a19a0cb7edac5b50231d2c1aa97)), closes [#7](https://github.com/twittwer/nx-tools/issues/7)
- configure semantic-release for workspace ([2c66a99](https://github.com/twittwer/nx-tools/commit/2c66a9970ab98a2e324cd8be1039e1c2693d1cad))
- enable auto releases via semantic-release & github actions ([bbc3a70](https://github.com/twittwer/nx-tools/commit/bbc3a7018b522b1f986f7b235e41a601279e16ca))

### Documentation

- **compodoc:** finalize documentation ([34f4e27](https://github.com/twittwer/nx-tools/commit/34f4e2752c66b3c27b9ff199b7d28080bdf393ef))
- add project ideas ([cbacc39](https://github.com/twittwer/nx-tools/commit/cbacc39bee1304d5c17bf7866c7d79f5d23bb173))

### Features

- **compodoc:** add compodoc plugin ([04402fb](https://github.com/twittwer/nx-tools/commit/04402fbb38250c019b8a3271c73e0d81c9717ff2))
- **compodoc:** generate workspace docs ([3ab6578](https://github.com/twittwer/nx-tools/commit/3ab6578eedd71dae5631c9f3918c26dcabd3d1fd))

### Miscellaneous

- initial commit ([dd40aeb](https://github.com/twittwer/nx-tools/commit/dd40aebcd504514b65131e835cdbe013b101d99b))
