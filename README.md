# Sparyers

>non-user project 
>
>every sprayer is create by yourself

## Sparyers-vue

### Compiles and minifies for production
```
yarn build
```
out path `/dist` 

## Sparyers-express



## Sparyers-nginx

>proxy for sprayers-vue and sprayers-express

### init sprayers-vue 
compiles sparyers-vue,out path is `./dist/`.copy this path to `./sparyers-nginx/html/`

### init sprayers-express
check sprayers-express port with `/sparyers-express/.env`. 

### init nginx
**init config**,config file `./conf/nginx.conf`
```js
{
    port:80,
    localhost / {
        root index
        index index.html
    },
    location /api/ {
        proxy_pass   http://localhost:3000/api/;
    }
}
```

## Sparyers-mongoDB

### windows 
install : https://www.mongodb.com/try/download/community

install doc : https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

develop doc : https://www.mongodb.com/docs/manual/