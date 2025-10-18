# Contributing to PixelPress

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1.  Fork the repo and create your branch from `develop`.
2.  If you've added code that should be tested, add tests.
3.  If you've changed APIs, update the documentation.
4.  Ensure the test suite passes.
5.  Make sure your code lints.
6.  Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issues](https://github.com/CostPress/pixelpress/issues)

We use GitHub Issues to track public bugs. Report a bug by opening a new issue; it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

-   A quick summary and/or background
-   Steps to reproduce
    -   Be specific!
    -   Give sample code if you can.
-   What you expected would happen
-   What actually happens
-   Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People *love* thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style

We use Prettier to format our code. Please run `npm run lint` before submitting your pull request to ensure your code conforms to our style.

## Branching Strategy

We follow a branching model based on GitFlow. The main branches are:

-   `main`: This branch contains production-ready code. All development should be done in separate branches.
-   `develop`: This is our main development branch. All feature branches are created from `develop` and merged back into it.
-   `feature/*`: These branches are used for developing new features. They are branched off of `develop` and merged back into `develop`.
-   `hotfix/*`: These branches are used for making urgent fixes to the `main` branch. They are branched off of `main` and merged back into both `main` and `develop`.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.