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
rancher apps install -n registration --set nameOverride=$1 ./deploy/chart $1
