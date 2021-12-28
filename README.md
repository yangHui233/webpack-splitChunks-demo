# webpack4 之 splitChunks

#### 简介

主要作用是提取公共代码，防止代码被重复打包，拆分过大的js文件，合并零散的js文件。

SplitChunks 插件的作用就是通过配置让 Webpack 去帮你提取公共代码

#### chunks
webpack构建静态资源。左侧的资源通过webpack后，就都转换成web浏览器能识别的资源。
以下图的webpack为划分点，左边的资源就是moudle，右边的资源就是bundle。
为了优化性能，比如快速打开首屏，利用缓存等，我们需要对过大的bundle进行拆分，对于拆分出来的东西，我们叫它chunk

#### 特点

webpack4有一个splitChunks默认配置，开箱即用

基本配置参数如下:

 ```javascript
  optimization: {
    splitChunks: {
    
       // initial表示只考虑非import()异步导入代码进行拆分，async表示只拆分异步代码块，而all表示同异步都加入拆分范畴。
       chunk: 'all', 
       
       // 表示文件大于3000k的时候才对他进行打包
        minSize: 3000, 

		  // 表示文件大于3000k的时候才对他进行打包
        maxSize: 0,
        
        // 当某个模块满足minChunks引用次数时，才会被打包。例如,lodash只被一个文件import，那么lodash就不会被code splitting,lodash将会被打包进 被引入的那个文件中。如果满足minChunks引用次数，lodash会被单独抽离出来，打出一个chunk。
        minChunks: 1, 
        
        // 在打包某个模块的时候，最多分成5个chunk，多余的会合到最后一个chunk中。这里分析下这个属性过大过小带来的问题。当设置的过大时，模块被拆的太细，造成并发请求太多。影响性能。当设置过小时，比如1，公共模块无法被抽离成公共的chunk。每个打包出来的模块都会有公共chunk
        maxAsyncRequests: 5,
        
        // 当vendors或者default中的filename不填时，打包出来的文件名就会带~
        automaticNameDelimiter: '~', 
        
        // 可为bool、string类型，true是会使用默认命名，否则使用序号命名；string指定文件名称
        name: true,
        
         // 自定义拆分组
        cacheGroups: {
             // 每个属性就是一个分组
            vendors: {
                // 导入路径的正则匹配，这为所有node_modules引用的模块代码
                test: /[\\/]node_modules[\\/]/,
                // 优先级默认为0，如果两个组引用了同一个模块，优先级高的组可以获得此模块
                priority: -10,
                filename: 'vendors.js'
            },
            // 打包除上面vendors以外的公共模块
            default: {  
                priority: -20,
                // 是否复用其他chunk内已拥有的模块
          		// 默认为false，关闭表示拆分出复用部分的模块，给双方引用
                reuseExistingChunks: true,
                filename: 'common.js'
            }
        }
    }
  }
 ```

####  建议
- 尽量将第三方库拆为独立分包。对于使用频率较高的库，应该将它们从具体页面剥离，避免重复加载。

- 路由懒加载，减少首屏资源负载

- 尽量保持 chunks = 'all' 从而最大程度优化分包逻辑

  



