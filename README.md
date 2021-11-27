# Using Nest.js as AWS Lambda
This project comes to demonstrate how to use [NestJS](https://nestjs.com/) to build AWS Lambda functions.
### TL;DR Do not use NEST.JS for AWS lambda unless you have to
 [NestJS](https://nestjs.com/) is a progressive server-side javascript framework that brings a lot of concepts from Angular.JS to the server side.
 It is best when building complex solutions, however for AWS Lambda functions (or GCP Cloud-Functions, or Azure functions) is too heavy and complex.
 ## Cold-Start and Responiveness
 AWS Lambda payment model is based on the total duration you consume. The more heavy and slow your dunction is, the more you pay.
 Also Lambda functions activation model means that spining up a new instance (cold-start) is significantly slower, and it is heavily affected by your code size and complexity.
 Nest.JS applications tend to carry a lot of dependencies (at minimum NEST core libraries) and their load is slower (because they start the dependency injection and other modules at startup)
 
 Below is the duration data from AWS for the attached projects

 ## Pure JavaScript
 The code here actually written in TypeScript, built with TSC and the results of the `deploy` folder where uploaded to AWS (note there is no node_modules folder required as we do not use any extra dependencies)

| BilledDurationInMS | Memory |
|---|---|
| 2 | 56|
| 121 | 56 |
|2 | 55 |
|2 | 55 |
|2 | 55 |

## NEST.JS (StandAlone Mode)
Building a NEST JS project Naively (using Nest New CLI command) will result in a bloated 200MB project.
If you take into account that AWS puts a hard-limit of 256MB on un-zipped code size of AWS lambda, that alone should worry you.

The approach I used here was to leave only the core Nest.JS dependencies in the `package.json` file and use Nest.JS [Standalone Application Mode](https://docs.nestjs.com/standalone-applications) to disable loading the HTTP server (express) and its pipeline.

After running `Nest Build` CLI command, I copied the deployment directory, added the `package.json` and `package-lock.json` files into it and run `npm install --production` command to include only the runtime dependencies.
I zipped and uploaded the directory (including the node_modules dir) to AWS lambda

| BilledDurationInMS | Memory |
|---|---|
| 347 | 78 |
| 43 | 77 |
| 256 | 77 |
| 20 | 80 |
| 420 | 80 |

## Conclusions
As you can see, it is not only that NestJS application takes almost 3 times the billable duration, The slow execution times cause AWS to spin more instances to compensate for a (moderate) rate of requests (the plain JS has only one cold-start, Nest.JS has 3)

This leads to almost 10 times more billable duration!