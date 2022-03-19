/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("reactors", (table) => {
      table.increments("reactor_id").primary();
      table.string("image_url").notNullable();
      table.string("last_modified").notNullable();
      table.string("foaming_status").defaultTo("unclassified");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("reactors");
};
