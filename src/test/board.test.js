import { expect, test } from "vitest";
import { Board } from "../model/subject/board";

test("initialising the board", () => {
  new Board(3).board;
});
test("testing all neighboring positions", () => {
  const board = new Board(3).board;
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
