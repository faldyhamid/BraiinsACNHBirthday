export default func => {
    const date = new Date();

    const formatted = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        weekday: 'short',
        day: 'numeric'
    }).format(date);

    return formatted;
}