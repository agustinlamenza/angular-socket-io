/* global io */
(function (io) {
	'use strict';

	angular
		.module('app.chat')
		.factory('hubService', hubService);

	hubService.$inject = ['$rootScope', '$log'];

	function hubService(rootScope, log) {

		var socket = io();

		var service = {
			send: _send,
			recive: _recive
		};

		return service;

		function _send(data) {
			if (!data) {
				return;
			}

			socket.emit('message', data);
		}

		function _recive(callback) {
			if (!callback) {
				return;
			}

			socket.on('message', function (data) {
				callback(data);
				rootScope.$apply();
			});
		}
	}
})(io);
