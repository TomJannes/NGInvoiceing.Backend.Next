import * as path from 'path';
import * as mm from 'mongodb-migrations';

export class Migrator {
    public migrate() {
        var migrator = new mm.Migrator({
            'url': 'mongodb://127.0.0.1:27017/NGInvoicing'
        });
        var migrationPath = path.join(__dirname, 'migrations');
        migrator.runFromDir(migrationPath, function(err, result){
            if(err) {
                console.warn(err);
            }
        });
    }
} 