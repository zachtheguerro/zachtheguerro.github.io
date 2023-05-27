$(document).ready(function() {
  // Function to append a message to the chat container
  function appendMessage(message, isUser) {
    var container = $('#chat-messages');
    var className = isUser ? 'user-message' : 'bot-message';
    var element = $('<div>').addClass(className).text(message);
    container.append(element);
    container.scrollTop(container.prop('scrollHeight'));
  }

  // Function to send user input and receive response
  function sendMessage() {
    var userInput = $('#user-input').val();
    if (userInput.trim() !== '') {
      appendMessage(userInput, true);
      $('#user-input').val('');

      // Make an AJAX request to the server to get chat response
      $.ajax({
        url: '/chat',
        type: 'POST',
        data: { user_input: userInput },
        success: function(data) {
          var response = data.response;
          appendMessage(response, false);
        }
      });
    }
  }

  // Send user message when "Send" button is clicked
  $('#send-btn').click(sendMessage);

  // Send user message when Enter key is pressed
  $('#user-input').keypress(function(event) {
    if (event.which == 13) {
      sendMessage();
    }
  });
});
