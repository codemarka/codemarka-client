# Contributing to Codemarka Client

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Code Organization](#code-organization)
- [Setting Up the project locally](#setting-up-the-project-locally)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Add yourself as a contributor](#add-yourself-as-a-contributor)

## Code of Conduct

We have a code of conduct you can find [here](./CODE_OF_CONDUCT.md) and every
contributor is expected to obey the rules therein. Any issues or PRs that don't
abide by the code of conduct may be closed.

## Code Organization

The Codemarka client is currently divided in to 3 parts. 

- `app`: The editor, the conversation, web RTC Communication ( Audio and Video ).
- `homepage`: The React website of the homepage, including blog post, community pages and user profile page.
- `codemarka-api`: Currently hosted seperately and urls can be found in the .env.example file at the root of
the repo.

This version of Codemarka is using the production server as source of truth,
this is specified by the environment variable `LOCAL_SERVER`. If you're working
on a feature that needs you to be logged in, you can login directly from the app and 
proceed with development on
[http://localhost:3000/](http://localhost:3000/). **Be very careful with how you
handle the token**, as anyone who knows it can login as you and have read/write
access to all your content!

**Working on your first Pull Request?** You can learn how from this _free_
series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Setting Up the project locally

To install the project you need to have `yarn` and `node`

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone
    your fork:

    ```sh
    # Clone your fork
    git clone https://github.com/<your-username>/codemarka-client.git

    # Navigate to the newly cloned directory
    cd codemarka-client
    ```

2.  Your environment needs to be running Node >= v. 10
    - `.nvmrc` config exists in the repo root, specifying a v.14.17.6 version
    - you can use [fnm](https://github.com/Schniz/fnm) (`fnm use`) to change
      your current node version to the one specified in `.nvmrc`
3.  from the root of the project: `npm` to install all dependencies
    - make sure you have latest `npm` version
4.  from the root of the project: `npm start`
    - this builds the dependencies and runs the `app` development environment,
      available on [http://localhost:3000/](http://localhost:3000/)
   

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```sh
> git remote add upstream https://github.com/codemarka/codemarka-client.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

5. If you want to debug the state of the app, use `yarn start:overmind` or run
   `npx overmind-devtools` and make sure that the app is running. Learn more
   [here](https://overmindjs.org/core/devtools).

## Submitting a Pull Request

Please go through existing issues and pull requests to check if somebody else is
already working on it, we use `someone working on it` label to mark such issues.



## Add yourself as a contributor

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

To add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

    ```sh
    # Add yourself to the contributors list
    yarn add -D @codemarka/contributors
    ```

Thank you for taking the time to contribute! 👍