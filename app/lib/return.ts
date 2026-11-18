// Remembers which room you were in, so the homepage can "pull back out" of
// that building's window when you return to the model.
const KEY = "ap-return-from";

export function markReturnFrom(room: string) {
  try {
    sessionStorage.setItem(KEY, room);
  } catch {}
}

export function takeReturnFrom(): string | null {
  try {
    const v = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return v;
  } catch {
    return null;
  }
}
