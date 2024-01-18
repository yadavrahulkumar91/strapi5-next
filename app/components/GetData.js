


export default async function getData(url) {
    try {
        const response = await fetch('https://author.rahulkumaryadav.com.np' + url);
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
