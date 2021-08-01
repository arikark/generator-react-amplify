const assert = require('@j154004/yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');
const fs = require('fs');

// Snapshot testing is done at each directory level according to the files in the "snapshots" folder.
// The default prompt answers are used.
function testDir(dirPath) {
  it(`reconcile ${dirPath}`, async () => {
    let files = [];
    try {
      files = fs.readdirSync(`./${dirPath}`).filter(file => file !== '.DS_Store');
    } catch (e) {
      // do nothing
    }
    files.forEach(file => {
      fs.statSync(`./${dirPath}/${file}`).isFile() &&
        assert.snapshotContent(
          path.join(dirPath, file),
          path.join(__dirname, `snapshots/${dirPath}`, file)
        );
    });
  });
}

describe('./app', () => {
  before(async () => {
    await helpers.run(path.join(__dirname, '../generators/app'));
  });
  testDir('frontend');
  testDir('frontend/src');
  testDir('frontend/.husky');
  testDir('frontend/public');
  // testDir('platform');
});
