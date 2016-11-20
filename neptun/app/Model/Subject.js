'use strict'

const Lucid = use('Lucid')

class Subject extends Lucid {
    
    category () {
        return this.belongsTo('App/Model/Category')
    }
}

module.exports = Subject
