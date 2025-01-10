import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Datepicker = forwardRef(
    ({ defaultDate, customSx, selectedDate, setSelectedDate }, ref) => {
        useEffect(() => {
            if (defaultDate) {
                setSelectedDate(dayjs(defaultDate, 'DD.MM.YYYY').endOf('day'));
            }

            return () => {
                setSelectedDate(null);
            };
        }, [defaultDate, setSelectedDate]);

        const handleDateChange = (date) => {
            const normalizedDate = date ? dayjs(date).endOf('day') : null;
            setSelectedDate(normalizedDate);
        };

        useImperativeHandle(ref, () => ({
            handleClearSelection: () => {
                setSelectedDate(null);
            },
            setSelection: (newDate) => {
                const normalizedDate = dayjs(newDate, 'DD.MM.YYYY').endOf('day');
                setSelectedDate(normalizedDate);
            },
        }));

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    sx={customSx}
                    format="DD.MM.YYYY"
                />
            </LocalizationProvider>
        );
    }
);

export default Datepicker;
