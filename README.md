# autopath
distribution route depends on file path in express 

##install

    npm install --save autopath

##example
In `app.js` :

    app.use(require('autopath')('./router',__dirname,ignoreFunction));

Then,files in `./router` will get all request.

###example file structure

    router
      |
      |-route.js
      |-route
      |   |-map.js
      |   \-url.js
      \-data
          |-get.js
          |-post.js
          |-put.js
          \-delet.js

###result for this example
If you GET `/route/map`,then method `get` exported by `./router/route/map` will be called.
And if you wants to add a param between `route` and `map`,for example `/route/map/someObjectId`,
<s>you should just match all your params in ignoreFunction.</s>
you should export an Array called `params` in `map.js`.
```
exports.params = ['theKeyNameOfParam0'];
```
And then you can call your params by this in method `get`,`post`,`put`,or `delet` by this in `map.js`.
```
export.get = function(){
    console.log(this['theKeyNameOfParam0']);// 'someObjectId'
}
```

