interface PathfindingModel extends Algo {
  setStartPoint(x: number, y: number): void;
  setEndPoint(x: number, y: number): void;
  toggleWall(x: number, y: number): void;
}
