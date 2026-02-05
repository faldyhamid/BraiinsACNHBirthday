export default func => {
    const date = new Date();

    const formatted = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit'
    }).format(date);

    return formatted;
}