const DecompressZip = require('decompress-zip');

module.exports = {
  extract(file, opts, callback) {
    const unzipper = new DecompressZip(file);
    unzipper.on('error', callback);
    unzipper.on('extract', () => callback());
    return unzipper.extract(opts);
  },

  list(file, callback) {
    const unzipper = new DecompressZip(file);
    unzipper.on('error', callback);
    unzipper.on('list', files => callback(null, files));
    return unzipper.list();
  },
};
