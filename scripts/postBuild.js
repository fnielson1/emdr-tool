/* eslint-disable no-console */

import fs from 'node:fs/promises';
import { zip } from 'zip-a-folder';

const DEPLOY_PATH = './deploy';
const DIST_PATH = './dist';

async function postBuild() {
  // Remove anything that exists inside the deployed folder
  await fs.rm(DEPLOY_PATH, { recursive: true, force: true });

  await fs.cp('./README.md', `${DIST_PATH}/README.md`, { force: true });

  await fs.mkdir(DEPLOY_PATH);
  await zip(`${DIST_PATH}/`, `${DEPLOY_PATH}/emdr-tool.zip`);
}

postBuild()
  .then(() => {
    console.log(`Zipped successfully.`);
  })
  .catch(reason => {
    console.error(reason);
  });
