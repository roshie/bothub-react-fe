

// Localhost
export const customerAppUrl = "http://localhost:3000"
export const adminAppUrl = ""
// export const backendAppUrl = "http://localhost:8000"

// Development
// export const customerAppUrl = ""
// export const adminAppUrl = "https://bothub.vercel.app"
export const backendAppUrl = "https://bothub-be.herokuapp.com"


export function getRequestParams(method, data) {
    return {
        method, 
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }
}
