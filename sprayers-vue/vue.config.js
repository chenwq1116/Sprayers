module.exports = {
  devServer:{
    port: process.env.PORT,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        // target: 'http://101.37.87.203:3001',
        changeOrigin:true
      }
    }
  }
}