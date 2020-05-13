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
