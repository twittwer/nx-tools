cd ..

rm -rf compodoc-test

NX_VERSION=latest
# NX_VERSION=13.10.2

npx create-nx-workspace@$NX_VERSION \
  --name=compodoc-test \
  --cli=nx \
  --nxCloud=false \
  --preset=angular \
  --appName=app \
  --style=scss

cd compodoc-test

npx nx generate @nrwl/angular:library \
  --name=lib

npx nx format

git add .
git commit -am "Workspace Setup"

npm i -D @twittwer/compodoc@latest

git commit -am "Install @twittwer/compodoc"

npx nx generate @twittwer/compodoc:config \
  --project=lib

git add .
git commit -am "Configure compodoc for lib"
