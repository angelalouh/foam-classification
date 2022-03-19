const service = require("./reactors.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function updateReactor(req, res) {
  const updatedReactor = {
    ...req.body.data,
    foaming_status: req.body.data.foaming_status,
    last_modified: new Date(),
  };
  const data = await service.update(updatedReactor);
  res.json({ data });
}

async function list(req, res, next) {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  let filter_selected = req.params.filter_selected;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResults = {};

  if (filter_selected && filter_selected !== "all") {
    if (filter_selected === "Unclassified") {
      filter_selected = "unclassified";
    }
    await service.filterReactorsByFoamingStatus(
      startIndex,
      limit,
      filter_selected,
      paginatedResults
    );
  } else {
    await service.listPaginatedReactors(startIndex, limit, paginatedResults);
  }

  if (endIndex < paginatedResults.total) {
    paginatedResults.nextPage = page + 1;
  }

  if (startIndex > 0) {
    paginatedResults.previousPage = page - 1;
  }

  res.json(paginatedResults);
}

module.exports = {
  update: asyncErrorBoundary(updateReactor),
  list: asyncErrorBoundary(list),
};
