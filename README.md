# automatic-spork
Automated git bot, tests the PRs and merges them to master.

Steps to install:
1.  Clone the repository
2.  Install mongo db
    Set ```MONGO_URI``` environment variable as url for mongodb e.g.: ```mongodb://localhost:27017/test```
3.  Get authrization token from github url: https://github.com/settings/tokens/new

    Export this token as  ```GITHUB_TOKEN```
4.  Add travis ci integration in repository integrations
4.  ```npm install```
5.  ```npm start```

Now whenever a pull request is made to the repository, if the build passes, the request will be automatically merged.
