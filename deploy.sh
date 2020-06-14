#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:miguelsilva5989/vuesort.github.io.git master:gh-pages

### np --help to check release types
cd ..
np minor  # to increment release number
# np patch

cd -
