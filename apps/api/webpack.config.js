const { composePlugins, withNx } = require('@nrwl/webpack');
const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const params = require('./src/app/mailer/templates/params.json')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {

  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.plugins.push(new HandlebarsPlugin({
    data: params,
    // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
    entry: path.join(process.cwd(), "apps", "api", "src", "app", "mailer", "templates", "*.hbs"),
    // output path and filename(s). This should lie within the webpacks output-folder
    // if ommited, the input filepath stripped of its extension will be used
    output: path.join(process.cwd(), "dist", "apps", "api", "templates", "[name].hbs"),
    // you can also add a [path] variable, which will emit the files with their relative path, like
    // output: path.join(process.cwd(), "build", [path], "[name].html"),
  }))
  return config;
});
