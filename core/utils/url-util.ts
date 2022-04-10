export class UrlUtil {
    public buildQueryStringFromObject = (obj: any): string => {
        const props = Object.keys(obj)
        const queryString: string[] = []

        for (let prop of props) {
            const propValue = obj[prop]

            if (Array.isArray(propValue)) {
                for (let value of propValue) {
                    queryString.push(`${prop}=${value}`)
                }
            } else {
                queryString.push(`${prop}=${propValue}`)
            }
        }

        return queryString.join('&')
    }
}
