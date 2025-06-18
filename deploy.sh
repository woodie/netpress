#!/bin/sh

# gcloud auth login

gcloud app deploy app.yaml --quiet --project=outgoing-netpress
