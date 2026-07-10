
export async function apiFetch(url, options = {}) {
    const response = await fetch(url, options)
    if(response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
    return response
}