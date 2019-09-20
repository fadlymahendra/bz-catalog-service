#!/usr/bin/env bash

set -e

script_dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

echo -e "Configuring scripts execution permission"

chmod 755 $script_dir/*
chmod 755 $script_dir/../../modules/*/deployments/lambda/scripts/*

echo - "Configuring scripts done"