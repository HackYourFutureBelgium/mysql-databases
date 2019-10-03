'use strict';

function resolve(res, todo, code) {
  res.status(code === 'No-Content' ? 204 : 200);
  res.json({ todo });
  res.end();
}
function error(res, message, code) {
  res.status(code === 'Not-Found' ? 404 : code === 'bad-request' ? 400 : code === 'Conflict' ? 409 : 500);
  res.json({ error: message });
  res.end();
}

module.exports = {
  error,
  resolve
};
