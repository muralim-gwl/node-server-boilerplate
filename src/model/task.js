const task={
  "title": "task",
  "description": "task for dailt routine",
  "type": "object",
  "properties": {
    "id": {
      "description": "positive integer or string of digits",
      "type": ["string", "integer"],
      "pattern": "^[1-9][0-9]*$",
      "minimum": 1
    },
    "name": { "type": "string", "maxLength": 128 },
    "email": { "type": "string", "format": "email" }
  },
  "required":["id"]
}

export default task;
