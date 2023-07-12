export function useFavicon(defaultHref) {
    const set = (hrefToSet) => {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = hrefToSet;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    const setFavicon = (href) => defaultHref && !href ? set(defaultHref) : set(href);
    return { setFavicon }
};

