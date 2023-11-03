import { useEffect, useState } from "react";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;

    const bulanIndo = (date) => {
        const nama = [
            'Jan', 'Feb', 'Mar', 'Apr',
            'Mei', 'Jun', 'Jul', 'Agu',
            'Sep', 'Okt', 'Nov', 'Des'
        ];
        return nama[date.getMonth()];
    }

    if (diffInMilliseconds < 60 * 60 * 100) {
        return 'BARU SAJA';
    }

    if (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    ) {
        return 'HARI INI';
    }
    
    if (diffInMilliseconds < 7 * 24 * 60 * 60 * 1000) {
        const dayAgo = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
        return `${dayAgo} HARI YANG LALU`;
    }

    const option = {day: 'numeric', month: 'numeric',  year: 'numeric' };
    return date.toLocaleDateString('en-US', option);
}

export function DateLabel(dateString) {
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const label = formatDate(dateString);
        setFormattedDate(label);
    }, [dateString]);

    return formattedDate;
}