const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Company = require('../models/COMPANY');

router.get('/test', (req, res) => res.send('company route testing!'));

router.get('/', (req, res) => {
    Company.find()
      .then(companies => res.json(companies))
      .catch(err => res.status(404).json({error: 'No companies found' }));
  });

  router.get('/:id', (req, res) => {
    Company.findById(req.params.id)
      .then(company => res.json(company))
      .catch(err => res.status(404).json({ error: `No  company found at ${req.params.id}` }));
  });

  router.post('/', [
    check('name').isLength({min : 20}).isAlphanumeric(),
  ],(req, res) => {
    Company.findOneAndUpdate(req.body, {upsert:true})
     .then(company => res.json(company))
     .catch(err => res.status(400).json({ error: `Unable to add this company ${req.body}` }));
  });

  router.put('/:id',[
    check('name').isLength({min : 20}).isAlphanumeric(),
  ], (req, res) => {
    Company.findByIdAndUpdate(req.params.id, req.body)
      .then(company => res.json(company))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the company in database' })
      );
  });

  router.delete('/:id', (req, res) => {
    Company.findByIdAndRemove(req.params.id, req.body)
      .then(company => res.json({ success: 'Company entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such company' }));
  });
  
  module.exports = router;