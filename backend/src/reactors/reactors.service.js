const knex = require("../db/connection");

function listPaginatedReactors(startIndex, limit, paginatedResults) {
  return Promise.all([
    knex("reactors").count("* as count").first(),
    knex("reactors")
      .select("*")
      .orderBy("reactor_id")
      .offset(startIndex)
      .limit(limit),
  ]).then(([total, rows]) => {
    const count = total.count;
    paginatedResults.total = parseInt(count);
    paginatedResults.per_page = limit;
    paginatedResults.from = startIndex + 1;
    paginatedResults.to = startIndex + rows.length;
    paginatedResults.last_page = Math.ceil(count / limit);
    paginatedResults.data = rows;
  });
}
function filterReactorsByFoamingStatus(
  startIndex,
  limit,
  filter_selected,
  paginatedResults
) {
  return Promise.all([
    knex("reactors")
      .where({ foaming_status: filter_selected })
      .count("* as count")
      .first(),
    knex("reactors")
      .where({ foaming_status: filter_selected })
      .orderBy("reactor_id")
      .offset(startIndex)
      .limit(limit),
  ]).then(([total, rows]) => {
    const count = total.count;
    paginatedResults.total = parseInt(count);
    paginatedResults.per_page = limit;
    paginatedResults.from = startIndex + 1;
    paginatedResults.to = startIndex + rows.length;
    paginatedResults.last_page = Math.ceil(count / limit);
    paginatedResults.data = rows;
  });
}

function update(updatedReactor) {
  return knex("reactors")
    .where({ reactor_id: updatedReactor.reactor_id })
    .update(updatedReactor, "*");
}

module.exports = {
  update,
  filterReactorsByFoamingStatus,
  listPaginatedReactors,
};
