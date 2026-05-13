#!/bin/sh

tempo -config.file=/etc/tempo.yaml &

nginx -g "daemon off;"
