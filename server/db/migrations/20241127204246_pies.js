/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('BakeryAwards', (table) => {
    table.increments('id').primary().notNullable()
    table.string('flavor', 50).notNullable()
    table.string('place', 50).notNullable() // Award place (e.g., Gold, Silver)
    table.string('baker', 50).notNullable() // Name of the baker
    table.string('bakery', 100).notNullable() // Name of the bakery
    table.string('address', 255).notNullable() // Address of the bakery
    table.string('img') // Pie image
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('BakeryAwards')
}
