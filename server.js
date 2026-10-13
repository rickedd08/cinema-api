const app = require('./app');
const connection = require('./config/database');

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao MySQL:', error.message);
    process.exit(1);
  }
  app.listen(3000, () => console.log('API iniciada na porta 3000'));
});
