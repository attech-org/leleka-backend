export const validUrl = (url: string) => {
  if (!url.trim()) {
    return false;
  }
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

export default validUrl;
