#!/usr/bin/env bash

# Manage Local Registry (verdaccio)
# https://github.com/nrwl/nx/blob/3fe973e01289080349ef3354e5133da18c822d47/scripts/local-registry.sh

COMMAND=$1

status() {
	echo "Current registry: $(npm config get registry)"
}

enable() {
  echo "Setting registry to local"
	echo "To Disable: npm run local-registry disable"
	npm config set registry http://localhost:4873/
}

disable() {
	npm config delete registry
	echo "Resetting local registry"
}

start() {
	echo "Starting local registry"
	VERDACCIO_HANDLE_KILL_SIGNALS=true
	npx verdaccio --config ./.verdaccio/config.json
}

clear() {
	echo "Clearing local registry"
	rm -rf ./.data/local-registry
}

case $COMMAND in
  status)
    status
  ;;
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
