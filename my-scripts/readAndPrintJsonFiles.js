// 从目录中读取json文件，每个文件都是一个json对象，然后打印这些json对象
const fs = require('fs');
const path = require('path');

async function readJsonFilesFromDirectory() {
  const directoryPath = '../local/json-data'; // 指定目录路径
  const csvFilePath = './local/output.csv'; // CSV文件路径
  // UTF-8 BOM header
  const bom = '\uFEFF';
  // CSV header
  const csvHeader = 'name,creater_name,ctime,mtime,doc_url\n';

  // Initialize CSV file with BOM and header
  fs.writeFileSync(csvFilePath, bom + csvHeader, { encoding: 'utf8' });

  try {
    // 读取目录中的所有文件
    const files = fs.readdirSync(directoryPath);

    // 过滤出 .json 文件
    const jsonFiles = files.filter(file => path.extname(file) === '.json');

    // 读取并解析每个 JSON 文件
    for (const file of jsonFiles) {
      try {
        const filePath = path.join(directoryPath, file);
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonObj = JSON.parse(data);

        for (const fileObj of jsonObj.body.file_list) {
          const { name, createrName, ctime, mtime, docUrl } = fileObj;
          // const newObj1 = { name, createrName, docUrl };

          // console.log(`File ${file}:`, newObj1);
          const ctimeFormatted = new Date(ctime * 1000).toLocaleString();
          const mtimeFormatted = new Date(mtime * 1000).toLocaleString();

          // Prepare CSV row data and escape commas/quotes if needed
          const rowData = [
            `"${name.replace(/"/g, '""')}"`,
            `"${createrName.replace(/"/g, '""')}"`,
            `"${ctimeFormatted}"`,
            `"${mtimeFormatted}"`,
            `"${docUrl.replace(/"/g, '""')}"`,
          ].join(',');

          // Append row to CSV file
          fs.appendFileSync(csvFilePath, `${rowData}\n`, { encoding: 'utf8' });

          console.log([name, createrName, ctimeFormatted, mtimeFormatted, docUrl].join(','));
        }
      } catch (error) {
        console.error(`Error reading or parsing ${file}:`, error.message);
      }
    }

    console.log(`Data successfully written to ${csvFilePath} with UTF-8 BOM`);
  } catch (error) {
    console.error('Error reading directory:', error.message);
  }
}

readJsonFilesFromDirectory();
