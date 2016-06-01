// Karma configuration
// Generated on Tue May 24 2016 12:53:53 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
    './app/bower_components/jquery/dist/jquery.js',
    './app/bower_components/angular/angular.js',
    './app/bower_components/angular-mocks/angular-mocks.js',
    './app/bower_components/angular-route/angular-route.js',
    './app/bower_components/angular-strap/dist/angular-strap.js',
    './app/bower_components/angular-strap/dist/angular-strap.tpl.js',
    './app/bower_components/ngjs-color-picker/js/ngjs-color-picker.js',
    './app/home/*.js',
    './app/use/*.js',
    './app/*.js',
    './app/home/*.html',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/home/*.html': ['ng-html2js']
    
    },

    ngHtml2JsPreprocessor: {
        // strip app from the file path
        stripPrefix: 'app/home/'
    },



    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
