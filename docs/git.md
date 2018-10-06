# Git setup

Authentication
The easiest way to supply a username / password to the remote host is to include it in the URL, for example:

const USER = 'something';
const PASS = 'somewhere';
const REPO = 'github.com/username/private-repo';

const git = require('simple-git/promise');
const remote = `https://${USER}:${PASS}@${REPO}`;

git().silent(true)
  .clone(remote)
  .then(() => console.log('finished'))
  .catch((err) => console.error('failed: ', err));
Be sure to enable silent mode to prevent fatal errors from being logged to stdout.

Environment Variables
Pass one or more environment variables to the child processes spawned by simple-git with the .env method which supports passing either an object of name=value pairs or setting a single variable at a time:

const GIT_SSH_COMMAND = "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no";

const git = require('simple-git');

git()
  .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND)
  .status((err, status) => { /*  */ })


const gitP = require('simple-git/promise');

gitP().env({ ...process.env, GIT_SSH_COMMAND })
  .status()
  .then(status => { })
  .catch(err => {});
  
Note - when passing environment variables into the child process, these will replace the standard process.env variables, the example above creates a new object based on process.env but with the GIT_SSH_COMMAND property added.
