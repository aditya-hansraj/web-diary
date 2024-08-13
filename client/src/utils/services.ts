export const BASE_URL = "http://localhost:5000/api";

export const postRequest = async (url: string, body: BodyInit | null | undefined) => {
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': "application/json"
        },
        body
    })
    const result = await response.json();
    return result;
};

