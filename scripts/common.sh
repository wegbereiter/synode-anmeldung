#!/usr/bin/env bash

PROJECTDIR=`cd $(dirname "$0")/..; pwd`
NODE_VERSION=6

execute_node() {
    docker run -it --rm -v "$PROJECTDIR":/usr/src/app -w /usr/src/app node:$NODE_VERSION $@
}