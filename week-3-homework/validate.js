'use strict';

const Ajv = require('ajv');
const ajv = new Ajv();

function validateTodoItem(data) {
  const schema = {
    'title':'todo validator',
    'type': 'object',
    'properties': {
      'todo': {
        'type': 'object',
        'properties': {
          'description': {
            'type': 'string'
          },
          'id': {
            'type': 'number'
          }
        },
        'required':['description', 'id']
      }
    },
    'required': [
      'todo'
    ]
  };
  return ajv.validate(schema, data);
};

function validateTodoTag(data) {
  const schema = {
    'title':'todo tag validator',
    'type': 'object',
    'properties': {
      'tag_todo_item': {
        'type': 'object',
        'properties': {
          'item_id': {
            'type': 'number'
          },
          'tag_id': {
            'type': 'number'
          }
        },
        'required':['item_id', 'tag_id']
      }
    },
    'required': [
      'tag_todo_item'
    ]
  };
  return ajv.validate(schema, data);
};

function validateTodoId(data) {
  const schema = {
    'title':'todo tag validator',
    'type': 'object',
    'properties': {
      'todo': {
        'type': 'object',
        'properties': {
          'id': {
            'type': 'number'
          }          
        },
        'required':['id']
      }
    },
    'required': [
      'todo'
    ]
  };
  return ajv.validate(schema, data);
};

module.exports = { validateTodoItem, validateTodoTag, validateTodoId };