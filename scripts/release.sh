#!/bin/sh
# Increments the project version (e.g. from 2.3.0 to 2.4.0)
# It handles both NPM package.json and git tags



# The default version increment is patch
# Used values: major|minor|patch where in x.y.z :
# major=x  
# minor=y 
# patch=z

if [ -z "$1" ]
then
  versionType="patch"
else
  versionType=$1
fi

# Increment version
npm version $versionType || exit 1

# Using the package.json version
version="$(grep '"version"' package.json | cut -d'"' -f4)"

# Generate changelog from commits
rm CHANGELOG.md;
npx easy-changelog --out=CHANGELOG.md;

git add package.json;
git add package-lock.json;
git add CHANGELOG.md;

git commit -m "Release $version"

git push origin main;

git tag ${version} ;

git push --tags ;

npm publish
