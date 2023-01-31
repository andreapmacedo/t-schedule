// https://codesandbox.io/s/tutorial-multiple-rbd-i2wm6?file=/src/App.js:1320-1328

import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

export const status = {
  [uuid()]: {
    name: "Requested",
    color: "#FFFAE6",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    color: "#EAE6FF",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    color: "#DEEBFF",
    items: []
  },
  [uuid()]: {
    name: "Done",
    color: "#E3FCEF",
    items: []
  }
};
