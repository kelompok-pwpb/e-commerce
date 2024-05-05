import fs from 'node:fs';
import appRootPath from 'app-root-path';
import path from 'path';
const rootPath = appRootPath.toString();
fs.readdir(path.join(appRootPath.toString(), 'storage'), (err, files) => {
    if (err) {
        console.log(err);
    }

    files.forEach((file) => {
        const filePath = path.join(rootPath, 'storage', file);
        const stat = fs.statSync(filePath);

        if (!stat.isDirectory()) {
            return;
        }

        fs.readdir(filePath, (_, files) => {
            files.forEach((file) => {
                const nestedPath = path.join(filePath, file);
                if (file === '.gitkeep') return;
                fs.unlinkSync(nestedPath);
            });
        });
    });
});
