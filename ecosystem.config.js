const port = {
  production: 3000,
  development: 3001
}
const production = {
  name: 'about',
  script: 'npm start',
  env: {
    NODE_ENV: 'production',
    PORT: port.production
  }
}
const development = {
  name: 'about',
  script: 'npm start',
  env: {
    NODE_ENV: 'development',
    PORT: port.development
  }
}
module.exports = {
  apps: [production, development]
};
