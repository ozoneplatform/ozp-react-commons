#!/usr/bin/env bash
# Trigger a build of ozp-hud and ozp-center (release) when a change is pushed to ozp-react-commons (release/* tag)
source /usr/local/node_versions/set_node_version.sh 5.3.0
echo "node version: "
node -v
npm install
npm run test

# Note: Post-build actions:
# Other Projects to Build, build-center-[release,lastest], build-hud-[release,lastest]
