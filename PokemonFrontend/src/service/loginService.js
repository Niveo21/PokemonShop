
export const loginUser = async (credentials) => {
    const response = await fetch('http://localhost:8080/login', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }

    return await response.text();
}
