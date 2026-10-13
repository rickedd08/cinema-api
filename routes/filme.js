const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.get('/', (req, res) => {
  connection.query('SELECT * FROM filme', (error, results) => {
    if (error) return res.status(500).json({ erro: error.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  connection.query('SELECT * FROM filme WHERE id = ?', [req.params.id], (error, results) => {
    if (error) return res.status(500).json({ erro: error.message });
    if (results.length === 0) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  const { titulo, genero, classificacao } = req.body;
  connection.query('INSERT INTO filme (titulo, genero, classificacao) VALUES (?, ?, ?)',
    [titulo, genero, classificacao], (error, result) => {
      if (error) return res.status(500).json({ erro: error.message });
      res.status(201).json({ id: result.insertId, titulo, genero, classificacao });
    });
});

router.put('/:id', (req, res) => {
  const { titulo, genero, classificacao } = req.body;
  connection.query('UPDATE filme SET titulo = ?, genero = ?, classificacao = ? WHERE id = ?',
    [titulo, genero, classificacao, req.params.id], (error, result) => {
      if (error) return res.status(500).json({ erro: error.message });
      if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Filme não encontrado' });
      res.json({ id: Number(req.params.id), titulo, genero, classificacao });
    });
});

router.delete('/:id', (req, res) => {
  connection.query('DELETE FROM filme WHERE id = ?', [req.params.id], (error, result) => {
    if (error) return res.status(500).json({ erro: error.message });
    if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Filme não encontrado' });
    res.json({ mensagem: 'Filme excluído com sucesso' });
  });
});

module.exports = router;
