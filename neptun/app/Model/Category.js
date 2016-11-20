'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    
    subjects () {
        return this.hasMany('App/Model/Subject')
    }
}

module.exports = Category
