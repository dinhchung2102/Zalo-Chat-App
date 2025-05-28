module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@components': './src/components',
            '@pages': './src/pages',
            '@assets': './src/assets',
            '@utils': './src/utils',
            '@styles': './src/styles',
            '@services': './src/services',
            '@state': './src/state',
            '@hooks': './src/hooks',
            '@api': './src/api',
          },
        },
      ],
      ['module:react-native-dotenv'],
    ],
  };
};
