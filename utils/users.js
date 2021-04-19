const users = [];

function userj(id, username) {
    const user = { id, username }
    users.push(user);
    return user;
}

function curruser(id) {

    return users.find(user => user.id === id)
}

module.exports = { userj, curruser, };