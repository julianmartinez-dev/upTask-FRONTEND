export const formatDate = date => {
    const newDate = new Date(date.split('T')[0].split('-'));

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    }

    return newDate.toLocaleDateString('en-US', options);
}