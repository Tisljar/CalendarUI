import { useEffect, useState } from 'react';
import { currentMonth, currentYear } from '../utils/currentDate';
import { getDate } from '../utils/getDate';
import { JsxElement } from 'typescript';
import Cell from './Cell';
import { daysOfWeek } from '../utils/daysOfWeek';
import { IMonth } from '../helpers/interface/IMonth';

const Calendar = () => {
    const thisMonth = getDate();
    const [monthName, setMonthName] = useState(thisMonth.monthName);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [calendarMonth, setCalendarMonth] = useState(getDate());
    const [numberedStart, setNumberedStart] = useState(0);
    const [numberedEnd, setNumberedEnd] = useState(0);
    const cellCss = ' p-4 border-b border-r';
    const emptyCellCss = 'border-b border-r w-full h-full';
    const updateCalendar = (month: string, year: string) => {
        setCalendarMonth(getDate(month, year));
        setMonthName(calendarMonth.monthName);
        setYear(calendarMonth.year);
        setNumberedStart(daysOfWeek.indexOf(calendarMonth.firstDayOfMonth));
        setNumberedEnd(6 - daysOfWeek.indexOf(calendarMonth.lastDayOfMonth));
    };
    const previousMonth = () => {
        const numOfMonth = parseInt(month, 10);
        const newNumOfMonth = numOfMonth - 1;
        if (newNumOfMonth < 1) {
            console.log('lastyear');
            let numOfYear = parseInt(year);
            const newYear = `${numOfYear - 1}`;
            const newMonth = '12';
            return updateCalendar(newMonth, newYear);
        } else {
            console.log('lastmonth');
            const newMonth = newNumOfMonth.toString();
            const newFormattedMonth = newNumOfMonth < 10 ? newMonth.toString().padStart(2, '0') : newMonth.toString();
            updateCalendar(newFormattedMonth, year);
        }
    };
    const nextMonth = () => {
        console.log('next');
        const numOfMonth = parseInt(month);
        const newNumOfMonth = numOfMonth + 1;
        if (newNumOfMonth > 12) {
            console.log('nextYear');
            let numOfYear = parseInt(year);
            const newYear = `${numOfYear + 1}`;
            const newMonth = '12';
        } else {
            console.log('nextmonth');
            const newMonth = newNumOfMonth.toString();
            const newFormattedMonth = newNumOfMonth < 10 ? newMonth.toString().padStart(2, '0') : newMonth.toString();
            updateCalendar(newFormattedMonth, year);
        }
    };
    // useEffect(() => {
    //     setCalendarMonth(getDate());
    //     setMonthName(calendarMonth.monthName);
    //     setYear(calendarMonth.year);
    //     setNumberedStart(daysOfWeek.indexOf(calendarMonth.firstDayOfMonth));
    //     setNumberedEnd(6 - daysOfWeek.indexOf(calendarMonth.lastDayOfMonth));
    //     // console.log(calendarMonth);
    // }, []);

    return (
        <div className="w-[1000px]  mx-auto mt-8 border">
            <div className="grid grid-cols-7 justify-center items-center text-center border-r border-t border-l">
                <Cell onClick={previousMonth} className="p-4 cursor-pointer border-r border-b">
                    {'<'}
                </Cell>
                <Cell className="p-4 col-span-5 border-r border-b">
                    {monthName} {year}
                </Cell>
                <Cell onClick={nextMonth} className="p-4 cursor-pointer border-r border-b">
                    {'>'}
                </Cell>
                {daysOfWeek.map((day) => (
                    <Cell className="p-4 border-r border-b" key={day}>
                        {day}
                    </Cell>
                ))}
                {Array.from({ length: numberedStart }).map((number, index) => (
                    <Cell className={emptyCellCss} key={index} />
                ))}
                {Array.from({ length: calendarMonth.monthDuration }).map((day, index) => {
                    const date = index + 1;
                    return (
                        <Cell className={cellCss} key={date}>
                            {date}
                        </Cell>
                    );
                })}
                {Array.from({ length: numberedEnd }).map((number, index) => (
                    <Cell className={emptyCellCss} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
