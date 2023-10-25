import { useEffect, useState } from 'react';
import { currentMonth, currentYear } from '../utils/currentDate';
import { getDate } from '../utils/getDate';
import { JsxElement } from 'typescript';
import Cell from './Cell';
import { daysOfWeek } from '../utils/daysOfWeek';
import { IMonth } from '../helpers/interface/IMonth';

const Calendar = () => {
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [calendarMonth, setCalendarMonth] = useState(getDate);
    useEffect(() => {
        setCalendarMonth(getDate());
        setMonth(calendarMonth.monthName);
        console.log(calendarMonth);
    }, []);

    return (
        <div className="w-[1000px]  mx-auto mt-8 border">
            <div className="grid grid-cols-7 justify-center items-center text-center border">
                <Cell className="p-4 cursor-pointer">{'<'}</Cell>
                <Cell className="p-4 col-span-5">
                    {month} {year}
                </Cell>
                <Cell className="p-4 cursor-pointer">{'>'}</Cell>
                {daysOfWeek.map((day) => (
                    <Cell className="p-4" key={day}>
                        {day}
                    </Cell>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
