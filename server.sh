#!/bin/sh

# gcloud info | grep Installation\ Root
# Installation Root: [/Applications/Utilities/google-cloud-sdk]

export CLOUD_SDK_ROOT=/Applications/Utilities/google-cloud-sdk
export APPLICATION_ID=dev~None
python3 $CLOUD_SDK_ROOT/bin/dev_appserver.py --host=0.0.0.0 --enable_host_checking=no .
