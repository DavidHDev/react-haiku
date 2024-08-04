# Contributing to React Haiku

Thank you for considering contributing to React Haiku! I appreciate your interest in making this project better.

To ensure a smooth collaboration, please read the following guidelines before getting started.

## Issue Tracker

We use the GitHub issue tracker to keep track of bugs, feature requests, and other project-related discussions. Before starting to work on a new feature or bug fix, please check the issue tracker to see if there's an existing issue or discussion related to it. If not, feel free to create a new issue.

## Branch Naming

When creating branches for your contributions, please follow the following naming convention:

`feat/<issue-number>-<short-description>`

For example, if the issue number on GitHub is 23 and you are working on a feature related to adding a new hook, your branch name could be `feat/23-add-...-hook`. This naming convention helps us to easily track and associate contributions with their respective issues.

## Documentation

Each new feature or update added should be documented in our `/docs` project where applicable. See the `README.md` inside the folder to set it up. It should only require `npm i` and `npm run start`.

If you want to help writing documentation for hooks that have not yet been included in a release, you'll have to link the package locally:

1. In the `root` folder of the repo:
- `npm run build` to build the hook library locally
- `npm link` to link the local version of the library to your global environment

2. In the `docs` folder:
- Delete the existing `react-haiku` folder from the `node_modules` directory
- `npm link react-haiku` to activate the link with the local version of the library
- Now you can check the linked `react-haiku` package in the `node_modules` directory (it should have a little arrow pointing up to the right of the package name) and see that it includes the hooks/utilities that are not yet released.

## Pull Requests

We welcome pull requests from everyone. To submit a pull request, please follow these steps:

1. Fork the repository and create a new branch based on the branch naming convention mentioned above.
2. Make your changes in the new branch.
3. Write tests if applicable, and ensure that existing tests pass (currently no tests)
4. Update the documentation if necessary.
5. Submit a pull request to the main repository's `main` branch.
6. Provide a clear and descriptive title for your pull request, along with a detailed description of the changes you have made, and screenshots/videos where possible.

## Conclusion

I appreciate your interest in contributing to React Haiku. By following these guidelines, you can help us maintain a healthy and productive open-source community. I value your contributions and look forward to your pull requests!

If you have any questions or need further assistance, please don't hesitate to reach out to us through the issue tracker or other communication channels mentioned in the project's documentation.

Happy contributing!
