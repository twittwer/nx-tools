#!/usr/bin/env bash

# Manage Local Registry (verdaccio)
# https://github.com/nrwl/nx/blob/3fe973e01289080349ef3354e5133da18c822d47/scripts/local-registry.sh

COMMAND=$1

enable() {
  echo "Setting registry to local"
	echo "To Disable: npm run local-registry disable"
	npm config set registry http://localhost:4873/
}

disable() {
	npm config delete registry
	CURRENT_NPM_REGISTRY=$(npm config get registry)
	echo "Resetting registry to global"
}

start() {
	echo "Starting Local Registry"
	VERDACCIO_HANDLE_KILL_SIGNALS=true
	npx verdaccio --config ./verdaccio.json
}

clear() {
	echo "Clearing Local Registry"
	rm -rf ./.data/local-registry
}

case $COMMAND in
  enable)
    enable
  ;;
  disable)
    disable
  ;;
  start)
    start
  ;;
  clear)
    clear
  ;;
  run)
    enable
    trap disable EXIT
    start
  ;;
esac
