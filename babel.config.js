module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@api': './api',
          '@components': './components',
          '@pages': './pages',
          '@assets': './assets',
          '@utils': './utils',
          '@styles': './styles',
          '@services': './services',
          '@state': './state',
          '@hooks': './hooks',
        },
      },
    ],
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-transform-class-properties', { loose: false }],
    ['@babel/plugin-transform-private-property-in-object', { loose: false }],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }]
  ],
};
