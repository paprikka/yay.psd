export const track = (eventType: string, viewId: string, eventId: string) => {
  if (!umami) return;
  if (location.host.startsWith("localhost")) {
    console.log(`[track] ${eventType}:${viewId}:${eventId}`);
    return;
  }
  umami(`${eventType}:${viewId}:${eventId}`);
};
