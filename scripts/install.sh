#!/usr/bin/env bash

SCRIPTDIR=`cd $(dirname "$0"); pwd`
source "$SCRIPTDIR/common.sh"

execute_node npm install $@
