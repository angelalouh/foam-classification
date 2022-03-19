const reactors = require("./00-reactors.json");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE reactors RESTART IDENTITY")
    .then(function () {
      return knex("reactors").insert(reactors);
    });
};
