'use strict';

/* eslint-env node */

const Alexa = require('alexa-sdk');

const APP_ID = 'APP_ID'; // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = 'SKILL_NAME';
const HELP_MESSAGE = 'You can ask me for ... you can say exit ... What can I do for you?';
const HELP_REPROMPT = 'Would you like me to...?';
const STOP_MESSAGE = 'Good bye.';
// const NOT_FOUND_MESSAGE = 'I don\'t know how to do that. Please ask for...';
// const NOT_FOUND_REPROMPT = 'Would you like me to give you ...?';

const handlers = {
  LaunchRequest: function LaunchRequest() {
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  SessionEndedRequest: function SessionEndedRequest() {
    this.emit(':tell', STOP_MESSAGE);
  },
  SAMPLEIntent: function GenerateIntent() {
    if (true) {
      const speechOutput = 'Test';
      this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput);
    }
    else {
      this.emit('LaunchRequest');
    }
    //   // incorrect request type
    //   this.emit(':ask', NOT_FOUND_MESSAGE, NOT_FOUND_REPROMPT);
  },
  'AMAZON.HelpIntent': function HelpIntent() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function CancelIntent() {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function StopIntent() {
    this.emit(':tell', STOP_MESSAGE);
  }
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
