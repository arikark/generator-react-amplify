# generator-amplify-react

> Generator for a basic aws amplify-hosted react app that ships with prettier and eslint configuration together with commitizen and husky.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-react-amplify using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)). Run npm link from generator parent dir.

```bash
npm install -g yo
npm install -g generator-amplify-react
```

Then generate your new project:

```bash
yo amplify-react
```

## Usage

- After answering the generator's prompts, follow the prompts by the Pulumi cli to deploy the React application to Amplify.
- Pulumi will deploy the React application to Amplify by using the credentials supplied to your machine's aws cli profile.
- Once your project is deployed, navigate to Amplify within the aws console. The application will deploy automatically.
- Once deployed to Amplify, any changes to the designated repo's master branch will be deployed by Amplify's CICD pipeline.
- When developing the React app, install its packages by running npm install in the React application's parent dir.
- The domain for the React app can be found in the Amplify console.

NB: The project will ask for a valid GitHub repo for the react application to be deployed to. This should be provided along with a valid access token. If this is not possible, you can elect to just generate the project with deploying it to Amplify.

## Deliverables

- Yeoman Generator: main branch
- Pulumi Code: platform branch (generated code)
- React application with linting and prettifying set up: frontend branch (generated code)
- CI/CD config: amplify.yml in frontend branch (generated code)
- Link to React app hosted on AWS: https://master.d12ookqvtntzxi.amplifyapp.com/ (deployed from master)

## Other Popular Ways of Hosting a React App in AWS

#### S3

A static React application can be hosted in s3 and distributed via CDN.
See: https://medium.com/dailyjs/a-guide-to-deploying-your-react-app-with-aws-s3-including-https-a-custom-domain-a-cdn-and-58245251f081

#### EC2/Docker

A React application can be containerised and deployed on an EC2 instance. While this may not be the most light weight approach, it is cloud provider agnostic and will allow for more flexibility. This can also be done without Docker, with the React app directly hosted on EC2.
See: https://dev.to/guha/dockerize-a-react-app-and-deploy-it-on-an-aws-ec2-instance-2knm

## License

MIT © [arielkark-versent]()
