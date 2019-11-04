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

// concerning-impacts
router.post('/concerning-impacts', function (req, res) {
  let answers = req.session.data['issues-of-concern'];
  let path = req.headers.referer.replace(/impact_/g, '');
  let level = -1;
  path = path.split("/");
  console.log(path);
  if (path[path.length - 1] == 'issues_of_concern') {
    req.session.data['concerns-impact-questions-key'] = 0;
    req.session.data['concerns-impacts-current'] = 1;
  } else {
    req.session.data['concerns-impact-questions-key'] = answers.indexOf(path[path.length - 1]) + 1;
    req.session.data['concerns-impacts-current'] = req.session.data['concerns-impact-questions-key'] + 1;
  }
  if (answers.length > 1) {
    req.session.data['concerns-impacts-current-legend'] = "  (" + req.session.data['concerns-impacts-current'] + " of " + answers.length + " concerns you identified)";
  } else {
    req.session.data['concerns-impacts-current-legend'] = "";
  }
  console.log(req.session.data['concerns-impacts-current-legend']);
  level = req.session.data[path[path.length - 1]];
  console.log(path[path.length - 1] + ' = ' + level);

  console.log(answers);
  console.log(req.session.data['concerns-impact-questions-key']);
  if (req.session.data['concerns-impact-questions-key'] < 0 || req.session.data['concerns-impact-questions-key'] == answers.length) {
    for (var i = 0; i < answers.length; i++) {
      if (req.session.data[answers[i]] == 'level4' || req.session.data[answers[i]] == 'level5') {
        res.redirect('/outcome_1');
        return;
      }
    }
    res.redirect('/action_already_taken');
  } else {
    res.redirect('/impact_' + answers[req.session.data['concerns-impact-questions-key']])
  }
})

router.post('/type-of-harm', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let answer = req.body['none']

  if (answer !== '_unchecked') {
    res.redirect('/issues_of_concern')
  } else {
    res.redirect('/outcome_1')
  }


})

module.exports = router