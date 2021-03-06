"use strict";

const AppDispatcher = require("../dispatchers/AppDispatcher");
const ActionTypes = require("../constants/AppConstants").NotificationActionTypes;
const LoginStore = require("../stores/LoginStore");
const UserStore = require("../stores/UserStore");
const NotificationStore = require("../stores/NotificationStore");
const ReconnectingWebSocket = require('../../node_modules/ReconnectingWebSocket/reconnecting-websocket.js');

function _websocket() {
  try {
    let socket = new ReconnectingWebSocket("ws://" + window.location.host + "/platform/socket");
    socket.onopen = (e) => {
      //console.log("open");
    };

    socket.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      AppDispatcher.dispatch({
        type: ActionTypes.RECEIVE_NOTIFI,
        data: data
      });

      let self = LoginStore.getUser();
      let user = UserStore.getUser(data.from_user_id);
      let content = data.content;
      if (self.id !== user.id) {
        content = user.realname.charAt(0).toUpperCase() + user.realname.slice(1) + content;
      }
      let title = "";

      console.log(data);
      /* TODO: dirty code, notification need to be migrated to have types. */
      if (content.indexOf("You have created an event") >= 0 || content.indexOf("Invited you to the event") >= 0) {
        title = "New Event";
      } else if (content.indexOf("You have canceled the event") >= 0 || content.indexOf("has canceled the event ") >= 0) {
        title = "Event Canceled";
      } else {
        title = "Event Up To Come"
      }

      let notification = new Notification(title, {
        icon: `http://www.gravatar.com/avatar/${user.emailMd5}?d=identicon`,
        body: content
      });

      notification.onclick = () => {

      };
    };

    socket.onerror = () => {
      //console.log("onerror");
    };
    socket.onclose = () => {
      //console.log("onclose");
    };
    return socket;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

export default {

  receive(startIndex) {
    if (startIndex === 0) NotificationStore.clear();
    let user = LoginStore.getUser();
    if (!user) return;
    $.get("/platform/api/users/" + user.id + "/notifications/" + startIndex + "/10").done(data => {
      NotificationStore.setTotal(data.total);
      AppDispatcher.dispatch({
        type: ActionTypes.RECEIVE_NOTIFI,
        data: data.notifications
      });
      if (NotificationStore.getWebSocket() === null) {
        NotificationStore.setWebSocket(_websocket());
      }
    }).fail(_ => {
      console.error(_);
    });
  },

  markAsRead() {
    let socket = NotificationStore.getWebSocket();
    if (socket === null) return;
    let data = [];
    NotificationStore.getAll().map(n => {
      if (!n.checked) data.push({id: n.id});
    });
    if (data.length === 0) return;
    socket.send(JSON.stringify(data));
    AppDispatcher.dispatch({
      type: ActionTypes.READ_NOTIFI,
      data: data
    });
  }

};
