import App from './App';

const PORT = process.env.APP_PORT || 3000;

App.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
