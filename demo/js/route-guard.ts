// routeGuard.ts
import { State, stateMachine } from "./state-machine";

// Explicit Map: routee = state
export const ROUTE_STATE_MAP: Record<string, State> = {
  "/": State.PHRASE_ISSUED,
  "/page2": State.QUESTIONS,
  "/page3": State.SUBMIT_PHRASE,
  "/page4": State.SUCCESS,
  "/page5": State.FAILURE,
  "/page6": State.TRANSFER_PORTAL,
  "/page7": State.DEMO_WALL,
};

export type RouteAccessResult =
  | { allowed: true }
  | { allowed: false; reason: "INVALID_ROUTE" | "INVALID_STATE" };

export function canAccessRoute(pathname: string): RouteAccessResult {
  const expectedState = ROUTE_STATE_MAP[pathname];

  // Ruta no definida en Carrd
  if (!expectedState) {
    return { allowed: false, reason: "INVALID_ROUTE" };
  }

  const currentState = stateMachine.getState();

  // El estado actual NO corresponde a esta página
  if (currentState !== expectedState) {
    return { allowed: false, reason: "INVALID_STATE" };
  }

  return { allowed: true };
}