var socket = io.connect('http://localhost:4000');

var addMessage = function(data) {
  $('#messages').prepend('<li class="list-group-item">' +
    '<h4 class="list-group-item-heading">' + data.name + '</h4>' +
    '<p class="list-group-item-text">' + data.message + '</p>' +
  '</li>');
};


socket.on('message-available', function (data) {
	for (var i = 0; i >= data.length; i++) {
		addMessage(data[i]);
	};
});

socket.on('message-added', addMessage);

$('#create-message').on('submit', function(e) {
	e.preventDefault();

	socket.emit('add-message', {
		name: $('input[name="name"]').val(),
    	message: $('textarea[name="message"]').val()
	});

	$('textarea[name="message"]').val('');
});

