
export default class Api {
    public static getData(): Promise<Response> {
        return fetch('/data', {
            method: 'GET',
        });
    }
}
