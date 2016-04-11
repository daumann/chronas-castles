module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
          //grunt task configuration will go here    
	ngAnnotate: {
	    options: {
		singleQuotes: true
	    },
	    app: {
		files: {
		    './app/min-safe/js/angulargrid.js': ['./app/js/angulargrid.js'],
		    './app/min-safe/js/animations.js': ['./app/js/animations.js'],
		    './app/min-safe/js/controllers.js': ['./app/js/controllers.js'],
		    './app/min-safe/js/directives.js': ['./app/js/directives.js'],
		    './app/min-safe/js/filters.js': ['./app/js/filters.js'],
		    './app/min-safe/js/services.js': ['./app/js/services.js'],
		    './app/min-safe/app.js': ['./app/js/app.js']
		}
	    }
	}, 

	concat: {
	    js: {
		src: ['./app/min-safe/app.js', './app/min-safe/js/*.js'],
		dest: './app/min/app.js'
	    }
	},

	uglify: {
	    js: { //target
		src: ['./app/min/app.js'],
		dest: './app/min/app.js'
	    }
	}

    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate'); 

    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}
