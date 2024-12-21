import React, { useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const Datepicker = ({ defaultDate, customSx, selectedDate, setSelectedDate }) => {
    useEffect(() => {
        if (defaultDate) {
            setSelectedDate(dayjs(defaultDate, 'DD.MM.YYYY').endOf('day'));
        }
    }, [defaultDate, setSelectedDate]);

    const handleDateChange = (date) => {
        // Ensure it's normalized
        const normalizedDate = dayjs(date).endOf('day');
        setSelectedDate(normalizedDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                format="DD.MM.YYYY"
                sx={customSx}
            />
        </LocalizationProvider>
    );
};

export default Datepicker;
