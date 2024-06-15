import App from './App';

const PORT = process.env.APP_PORT || 3000;

App.listen(PORT, () => {
  console.log(`${process.env.APP_NAME} << listening on PORT: ${PORT}`);
});
