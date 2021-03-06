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

// concerning-issues
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
  console.log(answers);
  if (answers.indexOf('adult_arguments_and_violence') > -1 &&
    answers.indexOf('substance_abuse') > -1 &&
    answers.indexOf('adult_mental_health') > -1) {
    res.redirect('/outcome_1');
    return;
  }
  let path = req.headers.referer.replace(/impact_/g, '');
  // let level = -1;
  path = path.split("/");
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

  // level = req.session.data[path[path.length - 1]];
  // console.log(path[path.length - 1] + ' = ' + level);

  // console.log(req.session.data['concerns-impact-questions-key']);
  if (req.session.data['concerns-impact-questions-key'] < 0 || req.session.data['concerns-impact-questions-key'] == answers.length) {
    for (var i = 0; i < answers.length; i++) {
      console.log(answers[i] + ' = ' + req.session.data['impact_' + answers[i]]);
      if (req.session.data['impact_' + answers[i]] == 'level4' || req.session.data['impact_' + answers[i]] == 'level5') {
        res.redirect('/outcome_1');
        return;
      }
    }
    res.redirect('/action_already_taken');
  } else {
    res.redirect('/impact_' + answers[req.session.data['concerns-impact-questions-key']])
  }
})

//action-already-taken
// TODO - don't really understand routing logic here
router.post('/action-already-taken', function (req, res) {
  if (req.session.data['action-taken'].indexOf('referred_children_services') > -1) {
    res.redirect('/outcome_1');
    return
  } else if (req.session.data['action-taken'].indexOf('signposted-to-information') > -1) {
    res.redirect('/outcome_3');
  }
  res.redirect('/outcome_3');
  // switch (req.session.data['action-taken']) {
  //   case 'signposted-to-information':
  //     res.redirect('/outcome_3');
  //     break;
  //   case 'single_agency_response':
  //     res.redirect('/outcome_2');
  //     break;
  //   case 'EHA':
  //     res.redirect('/outcome_1');
  //     break;
  //   case 'referred_children_services':
  //     res.redirect('/outcome_3');
  //     break;
  //   case 'none':
  //   default:
  //     res.redirect('/outcome_3');
  //     break;
  // }
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