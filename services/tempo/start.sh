#!/bin/sh

# Start Nginx in the background
nginx &

# Start Tempo with the explicitly defined configuration file path
exec /tempo -config.file=/etc/tempo.yaml
