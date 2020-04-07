const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

//{ id: "uuid", title: 'Desafio Node.js', techs: ["Node.js", "..."], likes: 0 };

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories)

});

app.post("/repositories", (request, response) => {
  const { title, techs, likes } = request.body;

  const repository = { id: uuid(), title, techs, likes };

  repositories.push(repository);

  return response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' })
  }

  const repository = {
    id,
    title,
    techs,
    likes,
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' })
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, techs, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' })
  }

  const repository = {
    id,
    title,
    techs,
    likes,
  }

  
  repositories[repositoryIndex].likes += 1;
  repositories[repositoryIndex] = repository;


  return response.json(repository.likes)

});

module.exports = app;
