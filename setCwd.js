const { exec } = require('child_process');
const { promisify } = require('util');

const promiseExec = promisify(exec);

const setCwd = async ({ dispatch, action, tab }) => {
  var newCwd = ''
  var nnn_dir = await promiseExec(`ps eww -o command ${tab.pid} | tr ' ' '\n' | grep 'NNN_DIR'`);
  if (nnn_dir.stdout.trim() !== '') {
    nnn_dir = await promiseExec(`eval echo "${nnn_dir.stdout.split('=')[1].trim()}"`);
    var path = nnn_dir.stdout.trim()
    var fs = require('fs');
    var os = require('os');
    try {
      if (fs.existsSync(path)) {
        newCwd = fs.readFileSync(path, 'utf-8');
      }
    } catch(err) {
      console.error(err)
    }
  }
  if (newCwd === '') {
    newCwd = await promiseExec(
      `lsof -a -p ${tab.pid} -d cwd -Fn | tail -1 | sed 's/.//'`);
  }
  // Since Node v8, return type of a promisified exec has changed: 
  // https://github.com/nodejs/node/commit/fe5ca3ff27 
  const cwd = typeof newCwd === 'string' ? newCwd.trim() : newCwd.stdout.trim();
  dispatch({
    type: 'SESSION_SET_CWD',
    cwd,
  });
};

// For Windows Support:
// the final excluded character () is an odd character
// that was added to the end of the line by posh-hg/posh-git
const directoryRegex = /([a-zA-Z]:[^\:\[\]\?\"\<\>\|]+)/mi;

const windowsSetCwd = ({ dispatch, action, tab, curTabId }) => {
  const newCwd = directoryRegex.exec(action.data);
  if (newCwd) {
    const cwd = newCwd[0];
    if (tab.cwd !== cwd && action.uid === curTabId) {
      dispatch({
        type: 'SESSION_SET_CWD',
        cwd,
      });
    }
    tab.cwd = cwd;
  }
};

module.exports = {
  setCwd,
  windowsSetCwd,
}
