import { execSync } from 'child_process';
import dotenv from 'dotenv';


dotenv.config();

execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
