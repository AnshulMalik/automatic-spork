# automatic-spork [![Build Status](https://travis-ci.org/AnshulMalik/automatic-spork.svg?branch=master)](https://travis-ci.org/AnshulMalik/automatic-spork)
Automated git bot, tests the PRs and merges them to master.

Steps to install:

1.  Clone the repository
2.  Install mongo db
    Set ```MONGO_URI``` environment variable as url for mongodb e.g.: ```mongodb://localhost:27017/test```
3.  Create a github bot account and add this account to users of repo.
4.  Get authorization token from github url: https://github.com/settings/tokens/new

    Export this token as  ```GITHUB_TOKEN```
5.  Add travis ci integration in repository integrations
6.  ```npm install```
7.  ```npm start```
8.  Add your public url to the webhooks of the repository.


Now whenever a pull request is made to the repository, if the build passes, the request will be automatically merged.
