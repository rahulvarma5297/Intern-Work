Get-Process -Id (Get-NetTCPConnection -LocalPort 3306).OwningProcess
taskkill /PID 10156 /F

Clone the project from github
Cretae `.env.development.local` and put the variables shared via Vault
Add a .env  file needed for Prisma with the following variable DATABASE_URL=mysql://root:password@localhost:3306/dev 
Run npm i 
Run MySQL via Docker docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:latest 
Run Redis via Docker docker run --name redis -p 6379:6379 redis/redis-stack-server:latest 
Run npx prisma migrate dev 
Start the project using npm run dev     