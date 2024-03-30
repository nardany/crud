import express from "express";

const app = express();

app.use(express.json());

const books = [{ id: 0, title: "title", author: "author", status: true }];

app.post("/books", (req, res) => {
  try {
    if (
      typeof req.body.author === "string" &&
      typeof req.body.title === "string" &&
      typeof req.body.status === "boolean"
    ) {
      const newBook = { ...req.body, id: new Date().getUTCMilliseconds() };
      books.push(newBook);
      res.status(201).json(newBook);
    } else {
      res.status(406).json("Input is not valid");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/books", (req, res) => {
  try {
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/books/:id", (req, res) => {
  try {
    const book = books.find((elem) => elem.id == req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json("Book not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/books/:id", (req, res) => {
  try {
    const book = books.find((elem) => elem.id == req.params.id);
    if (book) {
      for (let key in req.body) {
        book[key] = req.body[key];
      }
      res.json(book);
    } else {
      res.status(404).json("Book not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/books/:id", (req, res) => {
  try {
    const index = books.findIndex((elem) => elem.id == req.params.id);
    if (index !== -1) {
      books.splice(index, 1);
      res.status(202).json("Deleted successfully");
    } else {
      res.status(404).json("Book not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
