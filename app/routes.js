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
    res.redirect('/your_concerns')
  } else if (professional === 'concerned-citizen') {
    res.redirect('/child_details_known')
  } else {
    res.redirect('/outcome_4')
  }
})

router.post('/child-known', function (req, res) {

  let answer = req.session.data['child-known']

  if (answer === 'yes') {
    res.redirect('/your_concerns')
  } else {
    res.redirect('/outcome_3')
  }
})


router.post('/concerning-issues', function (req, res) {

  let answer = req.session.data['concerning-issues']

  if (answer === 'significant-harm') {
    res.redirect('/significant_harm')
  } else {
    res.redirect('/issues_of_concern')
  }
})


router.post('/type-of-harm', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let answer = req.body['none']

  if(answer !== '_unchecked') {
    res.redirect('/issues_of_concern')
  } else{
    res.redirect('/outcome_1')
  }   
    

})

module.exports = router