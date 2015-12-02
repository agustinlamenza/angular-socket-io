(function () {
	'use strict';

	angular
		.module('app.chat')
		.directive('chatApp', chatApp);

	chatApp.$inject = ['hubService'];

	function chatApp(hub) {
		var component = {
			restrict: 'E',
			templateUrl: '/js/app/chat/chat.template.html',
			controller: Chat,
			controllerAs: 'vm',
			scope: {},
			bindToController: {
				title: '@'
			}
		};

		return component;

		function Chat() {
			var vm = this;

			vm.author = 'Agustín G.L.';
			vm.name = '';
			vm.message = '';
			vm.messages = [];

			vm.send = send;

			function send() {
				hub.send(message({
					name: vm.name,
					message: vm.message,
					date: new Date()
				}));

				vm.message = '';
			}

			hub.recive(function (data) {
				vm.messages.push(message(data).description());
			});
		}

		function message(spec) {
			var name = spec.name || 'computer',
				message = spec.message || 'nothing',
				date = spec.date || new Date();

			var description = function () {
				return date + ' | ' + name + ' => ' + message;
			};

			return {
				name: name,
				message: message,
				date: date,
				description: description
			};
		}
	}
})();
