(function () {

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	App.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'project': "manage_project",
            'project/:id': "view_project",
			'project/:id/delete': "delete_project",
			'*other': 'default'
		},

		index: function () {
			console.info("调用了 Index 路由<br>");
		},

		manage_project: function(){
			console.info("调用了 Manage Project 路由<br>");
			//Todo: pre_login
		},

		view_project: function (pid) {
			console.info("调用了 View Project 路由，pid 等于 " + pid + "<br>");
			load_name(pid);
			//Todo: pre_login

			//Todo: mindmap init() + load()
			init();
			load_node(pid);
		},

        delete_project: function (pid) {
			console.info("调用了 Delete Project 路由，pid 等于 " + pid + "<br>");
			//Todo: unload project
			unload_name();
			unload_node();

            delete_project(pid);
            //Todo: set URL to #project //done!
			window.location.hash = "#project"
			//Todo: pre_login
		},

		default: function (other) {
			console.info("你访问的 " + other + " 路由未定义<br>");
		}		
	});

	new App.Router();
	Backbone.history.start();

})();
