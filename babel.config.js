module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'], 
          alias: {
            '@api':'./api' ,
            '@components': './components', 
            '@pages': './pages',        
            '@assets': './assets',          
            '@utils': './utils',
            '@styles': './styles',
            '@services':'./services',
            '@state': './state',
            '@hooks':'./hooks',
                        
          }
        }
      ]
    ]
  };
  