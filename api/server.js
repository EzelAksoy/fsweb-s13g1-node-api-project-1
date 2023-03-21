// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");

const server = express();
const model = require("./users/model");
const port = 3000;
server.use(express.json());
server.post("/api/users", (req, res) => {
  try {
    let addUser = req.body;
    if (!addUser.name || !addUser.bio)
      res.status(400).json({
        message: "Lütfen kullanıcı adı için bir name ve bio sağlayın",
      });
    else {
      model.insert(addUser).then((newUser) => {
        res.status(201).json(newUser);
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});
server.get("/api/users", async (req, res) => {
  try {
    let users = await model.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
server.get("/api/users/:id", async (req, res) => {
  try {
    let user = await model.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});
server.delete("/api/users/:id", async (req, res) => {
  try {
    let id = await model.findById(req.params.id);
    if (!id) {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    } else {
      await model.remove(req.params.id);
      res.status(200).json(id);
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});
server.put("/api/users/:id", async (req, res) => {
  try {
    let id = await model.findById(req.params.id);
    if (!id) {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    } else {
      let change = req.body;
      if (!change.name || !change.bio) {
        res
          .status(400)
          .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
      } else {
        let chanegeUser = await model.update(req.params.id, change);
        res.status(200).json(chanegeUser);
      }
    }
  } catch (error) {
    res.status(500).json("Kullanıcı bilgileri güncellenemedi");
  }
});
module.exports = server; // SERVERINIZI EXPORT EDİN {}
