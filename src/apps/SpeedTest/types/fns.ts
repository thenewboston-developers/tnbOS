export enum SpeedTestFn {
  ping = 'ping',
  pong = 'pong',
}

export interface PingParams {
  runId: string;
}

export interface PongParams {
  runId: string;
}
