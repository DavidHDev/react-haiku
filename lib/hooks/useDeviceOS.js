export const useDeviceOS = () => {
    const { platform } = navigator.userAgentData;
    if (!!platform) return platform;
    // For mobile emulators on browsers
    return checkOSBasedOnAgentInfo(navigator.userAgent);
};

const checkOSBasedOnAgentInfo = info => {
    switch (true) {
        case info.includes('iPhone') || info.includes('iPad'):
          return 'iOS';
        case info.includes('Linux'):
          return 'Linux';
        case info.includes('Windows'):
          return 'Windows';
        default:
          return extractUniqueOS(info);
    }
};

const extractUniqueOS = (info) => {
    const regex = /\(([^)]+)\)/;
    const matches = info.match(regex);
    if (matches && matches.length > 1) {
      const deviceText = matches[1];
      const firstWord = deviceText.trim().split(' ')[0];
      return firstWord.slice(0, -1);
    }
    return 'Unknown';
  };