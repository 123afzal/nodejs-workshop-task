const service = require('../service/tasks.service');

async function getRecord(req, res) {
  const isEmpty = obj => Object.keys(obj).length <= 0;
  if (!isEmpty(req.query)) {
    res.status(200).send(service.find(req.query));
    return;
  }
  res.status(200).send(await service.findAll());
}

function getRecordById(req, res) {
  try {
    const id = req.params.id;
    const task = service.find({ id });
    res.send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
  res.send();
}

async function searchRecord(req, res) {
  try {
    const task = req.body;
    console.log(task);
    res.send(await service.find(task));
  } catch (e) {
    res.status(400).send(e.message);
  }
  res.send();
}

async function postRecord(req, res) {
  const task = req.body;
  const record = await service.insert(task);
  res.status(201).send(record);

  res.send();
}

function putRecord(req, res) {
  const task = req.body;
  const record = service.update(task);
  res.status(201).send(record);

  res.send();
}

function deleteRecord(req, res) {
  try {
    const id = req.params.id;
    const tasks = service.deleteById(id);
    res.status(400).send(tasks);
  } catch (e) {
    if (e.message === 'ID_NOT_FOUND') {
      res.status(400).send('invalid task id');
      return;
    }
    res.status(400).send(e.message);
  }
}

module.exports = {
  getRecord,
  getRecordById,
  searchRecord,
  postRecord,
  deleteRecord,
  putRecord
};
