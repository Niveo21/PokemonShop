
export const registerUser = async (user) => {
    const response = await fetch('http://localhost:8080/registro', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }

    return await response.text();
}
