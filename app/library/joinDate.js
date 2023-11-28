import { useEffect, useState } from "react";

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const bulanIndo = (date) => {
        const nama = [
            'Jan', 'Feb', 'Mar', 'Apr',
            'Mei', 'Jun', 'Jul', 'Agu',
            'Sep', 'Okt', 'Nov', 'Des'
        ];
        return nama[date.getMonth()];
    }

    const month = bulanIndo(date);

    const year = date.getFullYear();
    const option = { year: 'numeric', month: 'short', day: 'numeric' };

    return `${month} ${year}`;
}

export function JoinDate(dateString) {
    const [joinDate, setJoinDate] = useState('');

    useEffect(() => {
        const label = formatDate(dateString);
        setJoinDate(label);
    }, [dateString]);

    return joinDate;
}