import React, { useEffect } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Datepicker = ({ defaultDate, customSx, selectedDate, setSelectedDate }) => {

    useEffect(() => {
        if (defaultDate) {
            setSelectedDate(dayjs(defaultDate, 'DD.MM.YYYY'));
        }
    }, [defaultDate, setSelectedDate]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
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
