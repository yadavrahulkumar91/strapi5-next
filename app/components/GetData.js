


export default async function getData(url) {
    try {
        const response = await fetch('http://127.0.0.1:1337' + url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Add 'await' here
        return data.data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
