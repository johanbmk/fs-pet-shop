let path = require('path');

if (!['read', 'create', 'update', 'destroy'].includes(process.argv[2])) {
  let fileName = path.basename(__filename);
  console.error(`Usage: node ${fileName} [read | create | update | destroy]`);
  process.exit(-1);
}
