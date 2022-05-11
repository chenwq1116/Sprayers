module.exports = {
  devServer:{
    port: process.env.PORT,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true
      }
    }
  }
}