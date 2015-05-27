import LoginStore from '../../stores/LoginStore';

function iconLink(iconClassName, content, href){
    return `<a target="_blank" href=${href} class="link-with-icon ${iconClassName}">${content}</a>`
}

const commands = [
    {
        name: 'vity',
        manual: ":room_name",
        hint: "Link to a Vity room",
        render: function(value){
            let user = LoginStore.getUser().realname;
            return iconLink('icon-videocam', `vity:${value}`, `https://46.137.243.49:5151/index.html#${value}@${user}`);
        }
    },
    {
        name: 'file',
        manual: ":file_id",
        hint: "Select to upload a file",
        render: function(value){
            return iconLink('icon-file-download', `file:${value}`, `/file/files/${value}/download`);
        }
    }
];

const commandsMap = commands.reduce((result, command)=> {
    result[command.name] = command;
    return result;
}, {});

module.exports = {
    list: commands,
    getCommand: (name) => {
        return commandsMap[name];
    }
};