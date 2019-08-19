exports.parseSlugFromFilename = function parseKey (key) {
  return key.split('\\').pop().split('/').pop().split('.png')[0]
}

exports.parseFilenameFromUrl = function parseKey (key) {
  return key.split('\\').pop().split('/').pop()
}
