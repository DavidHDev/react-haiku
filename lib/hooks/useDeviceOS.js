export const useDeviceOS = () => {
    const { platform } = navigator.userAgentData;
    if (!!platform) return platform;
    // For mobile emulators on browsers
    return checkOSBasedOnAgentInfo(navigator.userAgent);
};

const checkOSBasedOnAgentInfo = info => {
    if (info.includes('iPhone') || info.includes('iPad') ){
        return 'iOS';
    } else if (info.includes('Linux')) {
        return 'Linux';
    } else if (info.includes('Windows')) {
        return 'Windows';
    }
    // For unique OS's like blackberry, tablets
    return extractUniqueOS(info);
};

const extractUniqueOS = info => {
    // sample info
    // Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
    const startIndex = info.indexOf('(');
    const endIndex = info.indexOf(')');
  
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const deviceText = info.substring(startIndex + 1, endIndex);
        const firstWord = deviceText.trim().split(' ')[0];
        return firstWord.slice(0, -1);
    } else {
        return 'Unknown';
    }
};