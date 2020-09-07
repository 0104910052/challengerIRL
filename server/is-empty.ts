export const isEmpty = (t: any): boolean => {
    if (t === '' || t === null || t === undefined || typeof t === 'undefined') {
        return true;
    }

    return false
};
