'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.create('categories', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable().unique()
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
