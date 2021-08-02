const aws = require('@pulumi/aws');
require('dotenv').config();

// create amplify app
const app = new aws.amplify.App('amplify-app', {
  name: process.env.APP_NAME,
  platform: 'WEB',
  accessToken: process.env.GITHUB_TOKEN,
  repository: process.env.GITHUB_URL
});
// create amplify branch
const master = new aws.amplify.Branch('master', {
  appId: app.id,
  branchName: 'master',
  framework: 'React',
  stage: 'DEVELOPMENT',
  enableAutoBuild: true
});

// Export the name of the app
exports.appArn = app.arn;
exports.branchArn = master.arn;
