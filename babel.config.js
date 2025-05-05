module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'], 
            alias: {
              '@components': './components',
              '@pages': './pages',
              '@assets': './assets',
              '@utils': './utils',
              '@styles': './styles',
              '@services': './services',
              '@state': './state',
              '@hooks': './hooks',
              '@api': './api',
            },
          },
        ],
        ['module:react-native-dotenv'],
      ],
    };
  };
  