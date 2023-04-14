const express = require("express");
let todoData = require("../todoData.json");
const router = express.Router();

//전체 조회
router.get("/", (req, res) => {
  res.json(todoData);
});

//특정 조회
router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    return res.json("Not Existed ID");
  }

  res.json(todoData[parseInt(id)]);
});

//생성
router.post("/", (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ error: "Input Title and Description" });
  }

  todoData.push({ title, desc, isDone: false });

  res.json(todoData);
});

//수정
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  if (parseInt(id) >= todoData.length) {
    return res.json("Not Existed ID");
  }

  todoData[parseInt(id)] = {
    title: title ? title : todoData[parseInt(id)].title,
    desc: desc ? desc : todoData[parseInt(id)].desc,
    isDone: todoData[parseInt(id)].isDone,
  };

  res.json(todoData);
});

//체크 박스
router.put("/done/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    return res.json("Not Existed ID");
  }

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title,
    desc: todoData[parseInt(id)].desc,
    isDone: !todoData[parseInt(id)].isDone,
  };

  res.json(todoData);
});

//삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    return res.json("Not Existed ID");
  }

  todoData = todoData.filter((v, i) => {
    return parseInt(id) !== i;
  });

  res.json(todoData);
});

module.exports = router;
