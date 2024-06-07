import { expect, test } from "vitest";

import { Board } from "../model/subject/board/board";
const size = { x: 3, y: 3 };
const board = new Board(size).grid;

test("testing all neighboring positions", () => {
  expect(board[1][1].topLeft.pos).toBe(0);
  expect(board[1][1].top.pos).toBe(1);
  expect(board[1][1].topRight.pos).toBe(2);
  expect(board[1][1].left.pos).toBe(3);
  expect(board[1][1].pos).toBe(4);
  expect(board[1][1].right.pos).toBe(5);
  expect(board[1][1].bottomLeft.pos).toBe(6);
  expect(board[1][1].bottom.pos).toBe(7);
  expect(board[1][1].bottomRight.pos).toBe(8);
});
