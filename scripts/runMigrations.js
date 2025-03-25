const path = require('path');
const fs = require('fs');

async function runMigrations() {
    const migrationsDir = path.join(__dirname, '../migrations');
    const migrations = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js'))
        .sort();

    for (const migration of migrations) {
        const { up } = require(path.join(migrationsDir, migration));
        try {
            console.log(`Running migration: ${migration}`);
            await up();
            console.log(`Successfully completed migration: ${migration}`);
        } catch (error) {
            console.error(`Error running migration ${migration}:`, error);
            process.exit(1);
        }
    }
}

if (require.main === module) {
    runMigrations().then(() => {
        console.log('All migrations completed successfully');
        process.exit(0);
    }).catch(error => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
}

module.exports = runMigrations;