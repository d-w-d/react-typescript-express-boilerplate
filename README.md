# Portal Site Boilerplate

## What's This?

Starter project with the essential infrastructure for a full-stack web app using:

- Typescript
- React
  - Hooks
  - MaterialUI
  - Webpack
  - ...
- Express
  - Swagger
  - ...

## How to Operate

Almost everything you need to operate this codebase is put into an executable bash script. These scripts always begin with '\_'.

## Quick Start

- Make sure you have node/npm installed

  - I recommend you use the [nvm](https://github.com/nvm-sh/nvm) tool to install/activate different versions of node/npm on your system
    To install nvm, run: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash`
    - Note: we'll be using node version 10
    - Basic usage of nvm to install and activate node v10:
      - `nvm install 10`
      - `nvm use 10`

- Clone the codebase to a directory on your machine: `git clone https://github.com/dwd-umd/sbn-portal-site.git .`
- Copy `.env-template` to `.env`
- Install node packages: `npm install`
- Start frontend: `./_client_manager`
- In separate tab, start server: `./_server_manager`
- Visit `http://localhost:3000` in your browser

## Code Organization

...

## TODOs

- Add e2e testing
- Setup Jenkins CI
- Purge unused packages
- SEO / SSR
- Add local-storage-tracked dark/light theme settings
- Add email service to backend
