import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

// 异步写入数据到文件
export function createFile(data, fileName = 'file') {
  let file = path.resolve(__dirname, `./${fileName}.json`);

  fs.writeFile(
    file,
    JSON.stringify(data, null, 2),
    { encoding: 'utf8' },
    err => {}
  );
}
