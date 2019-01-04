#!/bin/sh

## GitLab push hook update script

# The output of this script is logged by PHP, so any unnecessary output should
# be discarded. To enable logging of any output the cd command produces, make
# the command look like this:
#
#     cd ..
#

deploy() {

    git pull origin master

    exit 0

}

cd ..

deploy &

exit 0
