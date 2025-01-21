module.exports = {
  devServer:{
    port: process.env.PORT,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        // target: 'http://47.113.231.205:3000',
        changeOrigin:true
      }
    }
  }
}