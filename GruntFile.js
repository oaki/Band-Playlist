module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            bootstrapFonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/fonts/',
                        src: ['**'],
                        dest: 'src/fonts/'
                    }
                ]
            },
            awesomeFonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/components-font-awesome/fonts/',
                        src: ['**'],
                        dest: 'src/fonts/'
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: "\n\n"
            },
            dist: {
                src: ['src/resources/js/**/*.js', '!src/resources/js/**/*.tests.js'],
                dest: 'src/<%= pkg.name %>.js'
            },
            deps: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-ui/jquery-ui.js',
                    'bower_components/angular/angular.min.js',

                    'bower_components/firebase/firebase-debug.js',
                    'bower_components/firebase-util/dist/firebase-util.min.js',
                    'bower_components/angularfire/dist/angularfire.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    //'bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
                    'bower_components/ngDraggable/ngDraggable.js',
                    'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
                    'bower_components/angular-wysiwyg/dist/angular-wysiwyg.js',
                    'bower_components/bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.js',
                    'bower_components/ng-sortable/dist/ng-sortable.js',
                    'bower_components/angular-ui-sortable/sortable.js',


                    'bower_components/ng-file-upload/ng-file-upload-all.js'
                ],
                dest: 'src/<%= pkg.name %>-deps.js'
            },
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'bower_components/components-font-awesome/css/font-awesome.css',
                    'src/resources/css/styles.css'
                ],
                dest: 'src/<%= pkg.name %>.css'
            },
            move: {
                src: ['bower_components/angularjs/angular.min.js.map'],
                dest: 'src/angular.min.js.map'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [{
                    'expand': true,
                    'src': 'src/<%= pkg.name %>.js',
                    'ext': '.annotated.js',
                    'extDot': 'last'
                }]
            }
        },

        less: {
            dev: {
                files: {
                    'src/resources/css/styles.css': 'src/resources/css/styles.less'
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/resources/js/**/*.js'],
                tasks: ['concat:dist']
            },
            styles: {
                files: ['src/resources/css/*.less'],
                tasks: ['less', 'concat:css']
            }
        },

        jasmine: {
            // Your project's source files
            src: 'src/**/*.js',
            // Your Jasmine spec files
            specs: 'specs/**/*spec.js',
            // Your spec helper files
            helpers: 'specs/helpers/*.js'
        },
        uglify: {
            my_target: {
                files: {
                    'src/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>-deps.js']
                }
            }
        }
    });

    //npm tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    //grunt.loadNpmTasks('grunt-karma');

    //tasks
    grunt.registerTask('default', 'Default Task Alias', ['build']);

    grunt.registerTask('build', 'Build the application',
        [
            'copy',
            'less:dev',
            'concat',
        ]);

    //grunt.registerTask('test', [
    //    'karma'
    //]);
};