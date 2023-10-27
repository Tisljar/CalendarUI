import axios from 'axios';

const getEvents = async (year: string) => {
    try {
        const apiKey = '3ZhqQ04gI8yBZ8VvUE6ZjUQDTf9jFF9M';
        const country = 'HR';
        const yearSearch = parseInt(year);
        const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${yearSearch},`;

        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getEvents;
