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
		    './castles/min-safe/js/angulargrid.js': ['./castles/js/angulargrid.js'],
		    './castles/min-safe/js/animations.js': ['./castles/js/animations.js'],
		    './castles/min-safe/js/controllers.js': ['./castles/js/controllers.js'],
		    './castles/min-safe/js/directives.js': ['./castles/js/directives.js'],
		    './castles/min-safe/js/filters.js': ['./castles/js/filters.js'],
		    './castles/min-safe/js/services.js': ['./castles/js/services.js'],
		    './castles/min-safe/app.js': ['./castles/js/app.js']
		}
	    }
	}, 

	concat: {
	    js: {
		src: ['./castles/min-safe/app.js', './castles/min-safe/js/*.js'],
		dest: './castles/min/app.js'
	    }
	},

	uglify: {
	    js: { //target
		src: ['./castles/min/app.js'],
		dest: './castles/min/app.js'
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
