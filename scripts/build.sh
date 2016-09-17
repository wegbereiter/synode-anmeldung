#!/usr/bin/env bash

SCRIPTDIR=`cd $(dirname "$0"); pwd`
source "$SCRIPTDIR/common.sh"

docker build -t examinator/synode-anmeldung . && docker push examinator/synode-anmeldung
