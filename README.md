# Scooter Viewer

A sample app for viewing scooters in a map

## Overview

This is a demo project, based on the **Engineering Exercise Question Set** provided to me to assess my technical approach to problems. A copy of the question set can be found in `questions.md` file of this repo.

This codebase answers **Part 1** of the question set. As mentioned in detailed in the question set, we are tasked to create a system, that fetches a list of scooters data, and displays them on the map.

I have also included my answer to **Part 2** in `p2-technical_design.md` file of this repo. My answer to **Part 3** is included in `p3-cover_letter.md` file.

## Live Version

There is a live version of this project running at [here](http://scooters.apps.bancuh.net/).

## Project Structure

This project consists of 3 components; a frontend client, a backend server, and a data storage.

I built the frontend client in React JS, using the common `create-react-app` toolkit. This also makes use of `google-map-react` library to actually render the scooter locations using Google Maps. Codes for the frontend resides in the `client/` directory.

The backend server is built in NodeJS, using the common `express` library. I am also using `sequelize` to make it easy to interact with the data storage. Codes for the backend resides in the `server/` directory.

The data storage, is just a MariaDB / MySQL database instance that I spin up. I've also included a few sql scripts to handle database schema initialization, and initial data seeds. When running this project locally, the scripts are automatically loaded during the start of the database. Related scripts for the database resides in the `db/` directory.

When running this project locally, each individual component is run is a separate **Docker** container. The components are run together in a single **Docker Compose** configuration. This saves the developer from having to manage different app runtimes and dependencies. However, you need to make sure both `docker` and `docker-compose` are installed on your system. I tested this setup in Linux, but it should work on Mac OS X and Windows 10 as well (I hope..).

The `scripts/` directory contains several bash scripts that helps simplify common tasks. While the scripts themselves are pretty short, it saves the developer from having to remember every docker commands needed.

## Getting Started

### Prerequisites

Please make sure you have `docker` and `docker-compose` installed on your machine.

### Cloning this repo

I have created a `deploy_token` that you can use to clone this repo from GitLab. Go ahead, clone this repo and cd into the project folder.

```shell
git clone https://beam:FMzT4sbwBcTKmTiGEhsj@gitlab.com/ragibkl/scooter-viewer.git
cd scooter-viewer
```

### Running the system

Run the start script. This should spin up the `db`, the `server`, and the `client` at the same time.
```shell
./scripts/start.sh
```

The `client` app should start spinning up, and listen for incoming connections. Visit `http://localhost:3000/` on you browser to see it in action. This should load up the map somewhere in Singapore, and show several **scooters** on the map.

Go ahead and play with the input fields to see changes in what is shown.

### Stopping the system
You can take down the project by running the stop script.
```shell
./scripts/stop.sh
```

## Miscellanous

You can see the logs by running the following:
```
./scripts/logs.sh
```

If you need to access the `shell` of any of the services, run one of the following commands:
```
./scripts/ssh.sh server
./scripts/ssh.sh db
./scripts/ssh.sh client
```

If you have access to a database management client, you can connect to the local `db` database instance with the following credentials.
```
host: 127.0.0.1
port: 3306
username: user
password: password
```

You can also run a linter against the `client` and `server` source codes.
```shell
./scripts/lint.sh
```
