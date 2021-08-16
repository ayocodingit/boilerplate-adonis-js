#!/bin/sh

app=${DOCKER_APP:-app}

if [ "$app" = "app" ]; then

    echo "Running the app..."
    npm run start

elif [ "$app" = "scheduler" ]; then

    echo "Running the scheduler..."
    npm run scheduler

else
    echo "Could not match the container app \"$app\""
    exit 1
fi