if [ -z $1 ]; then
    echo "Please specify an app name";
    exit 1
fi

filePath="deploy/chart/config/$1.yaml"

if [ ! -f $filePath ]; then
    echo "The given app name has no matching configuration file in: $filePath";
    exit 1
fi

rancher context switch Wegbereiter
rancher apps upgrade --set nameOverride=$1 $1 ./deploy/chart
