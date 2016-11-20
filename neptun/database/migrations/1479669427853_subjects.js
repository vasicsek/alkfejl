'use strict'

const Schema = use('Schema')

class SubjectsTableSchema extends Schema {

  up () {
    this.create('subjects', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable().unique()
      table.integer('semester')
      table.integer('credit')
      table.integer('category_id').unsigned().references('id').inTable('category')
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('subjects')
  }

}

module.exports = SubjectsTableSchema
