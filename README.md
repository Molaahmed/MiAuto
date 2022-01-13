# MiAuto Employee Platform

Welcome to the GitHub-repository of the MiAuto Employee Platform. On this version of the platform Garage Administrators of MiAuto are able to use CRUD actions on Employees, Clients, Cars and Appointments.

## Installation

### Introduction

This project was created using Angular and Angular CLI with the IDE Visual Studio Code.

**Angular** is a front-end framework which is used to create web applications. It uses **TypeScript** by default for creating logics and methods for a class but the browser doesn't know TypeScript. Here webpack comes in picture. Webpack is used to compile these TypeScript files to JavaScript. In addition, there are so many configuration files you will need to run an Angular project on your computer.

**Angular CLI** is a tool that does all these things for you in some simple commands. Angular CLI uses webpack behind to do all this process.

**Visual Studio Code** is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux. It comes with built-in support for JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for other languages (such as C++, C#, Java, Python, PHP, GO) and runtimes (such as .NET and Unity).

### Prerequisites

#### Visual Studio Code

Before you can clone the project, please make sure you have installed Visual Studio Code. If you haven't installed it yet, you can download it here: https://code.visualstudio.com/.

#### Node.js and NPM

Please also make sure you have installed node and npm in your system. You can check your current node version and npm version by using the following commands:

```bash
node --version
npm --version
```

If you haven't installed Node.js yet, you can download it here: https://nodejs.org/en/download/.

**Note:** Basically npm is installed at the same time as Node.js. If not, you can always download the latest version of npm by using the following command:

```bash
npm install -g npm
```

#### Angular CLI

At last please also make sure you have installed the Angular CLI in your system. If you haven't installed it yet, you can install it by using the following command:

```bash
npm install -g @angular/cli
```

That's it! You are now ready to create a new Angular project or use an existing Angular project.

### Setup of the project

#### Step 1: Clone the project
The first step is to clone this project to your system. You can do this by using the following command:

```bash
git clone https://github.com/Molaahmed/MiAuto.git
```

#### Step 2: Open the project in your IDE
The second step is to open the IDE you want to work with. Then you have to open the project within the opened IDE.

#### Step 3: Start the project
The third step is to start the project. You can do this by using the following command:

```bash
ng serve
```

You can also do this by using one of the npm scripts. To make them appear you need to click on the `package.json` file.

Use the start script, which does the same as the `ng serve` command, to start the project.

**Note:** Make sure you have selected `NPM scripts` to make them appear, if they are not appearing at first.
![selecting-npm-scripts-visual-studio-code](https://user-images.githubusercontent.com/89905945/148758297-39b72997-8fdc-44cc-9c2e-7ec61008f026.png)

#### Step 4: Accessing the project
The last step is to access the launched project on your web broswer. You can access the launched project by going to the following URL: http://localhost:4200/

If all goes well, you should see the following page:
![miauto-employee-platform-login-screen](https://user-images.githubusercontent.com/89905945/148756867-e30dd99b-ce9f-455f-b7bf-082a292974cf.PNG)

On this page you, as a Garage Administrator, can login to the MiAuto Employee Platform with the right credentials.

### Changing the API
A hosted version of the API was used for this project, so that it is available for making various calls. To change this you need to change the `API_URL` variable in each service of the project to the desired URL.
![changing-current-api](https://user-images.githubusercontent.com/89905945/148758584-abc9597c-5248-43af-a0d6-2585af97a77b.png)
