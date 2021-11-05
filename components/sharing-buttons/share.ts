const shareLegacy = (url: string) => {
  if (!window.ClipboardItem)
    return Promise.reject(new Error("Clipboard access not supported"));
  const text = location.href;
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new (ClipboardItem as any)({ [type]: blob })];

  return navigator.clipboard.write(data);
};

export const share = (url: string) => {
  return shareLegacy(url);
};
