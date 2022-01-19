const fs = require('fs');
const path = require('path');

//path de la database
const pathuUserJson = path.join(__dirname, '../dataBase/userData.json');
//leemos la database
const userArray = JSON.parse(fs.readFileSync(pathuUserJson, 'utf-8'));

const User = {
    getData: function () {
        return userArray;
    },

    findAll: function () {
        return this.getData();
    },
    
    generateId: function () { 
        let allUsers = this.findAll();
        let lastUser = allUsers[allUsers.length - 1];
        if (lastUser) {  
            return lastUser.id + 1;
        } return 1;
    },


    findByPk: function (id)  {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user=>user.id===id);
        return userFound;
    },

    findByField: function (field, text)  {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user=>user[field]===text);
        return userFound;
    },

    create: function (user) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...user
        }
        allUsers.push(newUser);
        fs.writeFileSync(pathuUserJson, JSON.stringify(allUsers, null, ' '));  
        return newUser;  
    },

    delete: function (id) {
        let allUsers = this.findAll();
        let userFiltered = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(pathuUserJson, JSON.stringify(userFiltered, null, ' '));  
        return true;  
    }

}

module.exports = User;