function useTimeConverter() {
    const convert = (time) => {
        const utcDate = new Date(time);
        utcDate.setUTCHours(utcDate.getHours() + 8);

        return utcDate;
    };

    return { convert };
}

export default useTimeConverter;
