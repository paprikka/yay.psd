export const track = (eventType: string, viewId: string, eventId: string) => {
  if (!("umami" in window)) return;
  if (location.host.startsWith("localhost")) {
    console.log(
      `[track] %c${eventType}:${viewId}:${eventId}`,
      "color: white; background: blue; "
    );
    return;
  }
  umami(`${eventType}:${viewId}:${eventId}`);
};
