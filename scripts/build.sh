#!/usr/bin/env bash

SCRIPTDIR=`cd $(dirname "$0"); pwd`
source "$SCRIPTDIR/common.sh"

docker build -t wegbereiter/synode-anmeldung . && docker push wegbereiter/synode-anmeldung
