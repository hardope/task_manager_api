const {ValidateUser} = require('./validate')
const FileSystem = require('fs')

class Database {

    constructor() {
        this.load()
    }

    get_all() {
        return this.users
    }

    get_one(id) {
        const user = this.users.find(user => user.id === parseInt(id))
        if (!user) return false
        return user
    }
    
    new (data) {
        const {error} = ValidateUser(data)
        if (error) return {error: error.details[0].message}

        const user = {
            id: this.users.length + 1,
            username: data.username,
            age: data.age,
        }

        if (data.first_name) {user.first_name = data.first_name} else (user.first_name) = ""
        if (data.last_name) {user.last_name = data.last_name} else (user.last_name) = ""

        this.users.push(user)
        this.save()
        return user
    }

    update(id, data) {
        const user = this.users.find(user => user.id === parseInt(id))
        if (!user) return false

        if (data.username) user.username = data.username
        if (data.age) user.age = data.age
        if (data.first_name) user.first_name = data.first_name
        if (data.last_name) user.last_name = data.last_name

        const {error} = ValidateUser(user)
        if (error) return {error: error.details[0].message}

        this.save()
        return user
    }

    delete(id) {
        const user = this.users.find(user => user.id === parseInt(id))
        if (!user) return false

        const index = this.users.indexOf(user)
        this.users.splice(index, 1)

        this.save()
        return user
    }

    save() {
        FileSystem.writeFileSync('database.json', JSON.stringify(this.users))
    }

    load() {
        try {
            this.users = JSON.parse(FileSystem.readFileSync('users.json'))
        } catch (error) {
            this.users = []
        }
    }
}

module.exports = Database