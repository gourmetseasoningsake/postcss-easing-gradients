const { src, dest } = require('gulp')
const postcss = require('gulp-postcss')


function transpile() {
  return src('src/index.css')
    .pipe(postcss([

      // if you use a json file for postcss-preset-env anyway...

      require('postcss-easing-gradients')(
        { stops: 24
        , alphaDecimals: 5
        , colorMode: 'lrgb'
        , dict: 'src/vars.json'
        }
      ),

      // ... but also works like so:

      // require('postcss-easing-gradients')(
      //   { stops: 24
      //   , alphaDecimals: 5
      //   , colorMode: 'lrgb'
      //   , dict:
      //     { '--color_1': 'blue'
      //     , '--color_2': 'red'
      //     }
      //   }
      // ),

      require('postcss-preset-env')({
        importFrom: 'src/vars.json',
        exportTo: 'public/vars.css'
      }),

    ]))
    .pipe(dest('public'))
}

exports.default = transpile
