const fs = require('fs');

function formatPath(path, end = '.json') {
  if (path.substr(-end.length) === end) return path;
  return path + end;
}

module.exports = (path, defaultPath) => {
  path = formatPath(path);
  if (!fs.existsSync(path)) {
    defaultPath = formatPath(defaultPath);
    if (defaultPath === undefined) {
      throw new Error(`"${path}" does not exist.`);
    } else if (fs.existsSync(defaultPath)) {
      try {
        fs.copyFileSync(defaultPath, path);
      } catch (err) {
        throw new Error(`Unable to copy default file from "${defaultPath}" to "${path}": ${err}`);
      }
    } else {
      throw new Error(`"${path}" and "${defaultPath}" does not exist.`);
    }
  }
  try {
    let text = fs.readFileSync(path);
    try {
      return JSON.parse(text);
    } catch(err) {
      throw new Error(`Wrong JSON format: ${path}`);
    }
  } catch (err) {
    throw new Error(`Unable to read file at "${path}": ${err}`);
  }
}
