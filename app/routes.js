const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line



//Branching 

// if professional collect contact details


router.post('/is-professional', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let professional = req.session.data['is-professional']

  if (professional === 'professional') {
    res.redirect('/professional_contact_details')
  } else {
    res.redirect('/outcome-4')
  }
})

router.post('/child-known', function (req, res) {

  let answer = req.session.data['child-known']

  if (answer === 'yes') {
    res.redirect('/concern')
  } else {
    res.redirect('/outcome_3')
  }
})


module.exports = router