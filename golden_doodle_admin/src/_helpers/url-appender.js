export function urlAppender(path) {
    

    if (path) {
        return 'http://localhost:999/app'+path;
    } else {
        return null;
    }
}