/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex) {
  await knex('userratings').delete()
  await knex('userratings').insert([
    {
      auth0_id: 'auth0|1234567890',
      pieId: 1,
      rating: 4,
    },
  ])
}
