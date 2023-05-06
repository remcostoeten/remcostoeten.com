export const getDevicePixelRatio = () => {
  if (typeof window === 'undefined') {
    return 1;
  }
  return window.devicePixelRatio || 1;
};
