var config = {
   entry: './index.js',
	
   output: {
      publicPath:'',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
         { test: /\.node$/, loader: "node-loader" }
      ]
   }
}

module.exports = config;