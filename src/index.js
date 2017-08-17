'use strict';

/* eslint-env node */

const Alexa = require('alexa-sdk');

const APP_ID = 'alexa-psychic'; // TODO replace with your app ID (OPTIONAL).
const SKILL_NAME = 'Alexa Psychic';
const HELP_MESSAGE = 'Would you like me to guess a number?';
const HELP_REPROMPT = 'Would you like me to guess a number?';
const STOP_MESSAGE = 'Good bye.';
// const NOT_FOUND_MESSAGE = 'I don\'t know how to do that. Please ask for...';
// const NOT_FOUND_REPROMPT = 'Would you like me to give you ...?';

const codewords = {
  i: 1,
  go: 2,
  can: 3,
  look: 4,
  please: 5, // quick
  will: 6, // please
  quick: 7, // will
  then: 8, // now
  now: 9, // now then
  favor: 0,
  next: -1
};

const decodeNumber = (str) => {
  let out = '';
  let lastNumber = -1;

  str.toLowerCase().split(/\s+/).forEach((word) => {
    if (word in codewords) {
      if (codewords[word] === -1 && lastNumber >= 0) {
        out += lastNumber.toString();
      }
      else {
        out += codewords[word].toString();
        lastNumber = codewords[word];
      }
    }
  });

  return out;
};

const handlers = {
  LaunchRequest: function LaunchRequest() {
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  SessionEndedRequest: function SessionEndedRequest() {
    this.emit(':tell', STOP_MESSAGE);
  },
  NumberGuessIntent: function NumberGuessIntent() {
    const wordSlot = this.event.request.intent.slots.Words;
    console.log(this);
    if (wordSlot && wordSlot.value) {
      const speechOutput = 'Test: ' + decodeNumber(wordSlot.value);
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
