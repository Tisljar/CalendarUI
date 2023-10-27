import { useEffect, useState } from 'react';
import { currentMonth, currentYear } from '../utils/currentDate';
import { getDate } from '../utils/getDate';
import Cell from './Cell';
import { daysOfWeek } from '../utils/daysOfWeek';
import getEvents from '../utils/getEvents';
import { IHoliday, IMonthlyHolidays } from '../helpers/interface/IMonthlyHolidays';

type props = {
    holidayData: IMonthlyHolidays;
    monthData: Array<IHoliday>;
    getData: Function;
    yearData: string;
    monthInfo: string;
};

const Calendar = ({ holidayData, monthData, getData, yearData, monthInfo }: props) => {
    const getMonthlyEvents = (yearlyHolidays: any, month: string) => {
        if (yearlyHolidays && yearlyHolidays.holidays) {
            const holidaysInTargetMonth = yearlyHolidays.holidays.filter((holiday: any) => {
                return holiday.date.datetime.month === parseInt(month);
            });
            return holidaysInTargetMonth;
        }
        return [];
    };

    const updateCalendar = (month: string, year: string) => {
        setCalendarMonth(getDate(month, year));
    };

    const previousMonth = () => {
        const numOfMonth = parseInt(month, 10);
        const newNumOfMonth = numOfMonth - 1;
        if (newNumOfMonth < 1) {
            let numOfYear = parseInt(year);
            const newYear = `${numOfYear - 1}`;
            const newMonth = '12';
            setMonth(newMonth);

            updateCalendar(newMonth, newYear);
            getData(newYear, newMonth);
            return;
        } else {
            const newMonth = newNumOfMonth.toString();
            const newFormattedMonth = newNumOfMonth < 10 ? newMonth.toString().padStart(2, '0') : newMonth.toString();
            setMonth(newFormattedMonth);
            updateCalendar(newFormattedMonth, year);
            return;
        }
    };

    const nextMonth = () => {
        const numOfMonth = parseInt(month);
        const newNumOfMonth = numOfMonth + 1;
        if (newNumOfMonth > 12) {
            let numOfYear = parseInt(year);
            const newYear = `${numOfYear + 1}`;
            const newMonth = '01';
            setMonth(newMonth);

            updateCalendar(newMonth, newYear);
            getData(newYear, newMonth);
            return;
        } else {
            const newMonth = newNumOfMonth.toString();
            const newFormattedMonth = newNumOfMonth < 10 ? newMonth.toString().padStart(2, '0') : newMonth.toString();
            setMonth(newFormattedMonth);
            updateCalendar(newFormattedMonth, year);
            return;
        }
    };

    const [thisMonth, setThisMonth] = useState(getDate(monthInfo, yearData));
    const [monthName, setMonthName] = useState(thisMonth.monthName);
    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [calendarMonth, setCalendarMonth] = useState(getDate());
    const [numberedStart, setNumberedStart] = useState(daysOfWeek.indexOf(thisMonth.firstDayOfMonth));
    const [numberedEnd, setNumberedEnd] = useState(6 - daysOfWeek.indexOf(thisMonth.lastDayOfMonth));
    const [yearlyHolidays, setYearlyHolidays] = useState<IMonthlyHolidays>(holidayData);
    const [monthlyHolidays, setMontlyHolidays] = useState<Array<IHoliday>>(monthData);
    let indexOfHolidays = 0;

    const cellCss = ' p-4 border-b border-r h-[150px] text-right flex flex-col';
    const emptyCellCss = 'border-b border-r w-full h-full';

    useEffect(() => {
        setThisMonth(getDate(monthInfo, yearData));
        setMonthName(thisMonth.monthName);
        setMonth(monthInfo);
        setYear(yearData);
        setCalendarMonth(getDate(monthInfo, yearData));
        setNumberedStart(daysOfWeek.indexOf(thisMonth.firstDayOfMonth));
        setNumberedEnd(6 - daysOfWeek.indexOf(thisMonth.lastDayOfMonth));
    }, [holidayData]);

    useEffect(() => {
        if (yearlyHolidays.holidays.length > 0) {
            const monthly = getMonthlyEvents(yearlyHolidays, month);
            setMontlyHolidays(monthly);
        }
    }, [yearlyHolidays, month]);

    useEffect(() => {
        setMonthName(calendarMonth.monthName);
        setYear(calendarMonth.year);
        setNumberedStart(daysOfWeek.indexOf(calendarMonth.firstDayOfMonth));
        setNumberedEnd(6 - daysOfWeek.indexOf(calendarMonth.lastDayOfMonth));
    }, [calendarMonth]);

    return (
        <div className="w-[1200px]  mx-auto mt-8 border">
            <div className="grid grid-cols-7 justify-center items-center text-center border-none rounded-lg">
                <Cell onClick={previousMonth} className="p-4 cursor-pointer border-none bg-lightgreen text-darkgreen">
                    {' '}
                    <b>{'<'}</b>
                </Cell>
                <Cell className="p-4 col-span-5 border-none bg-lightgreen text-darkgreen">
                    <b>
                        {monthName} {year}
                    </b>
                </Cell>
                <Cell onClick={nextMonth} className="p-4 cursor-pointer border-none bg-lightgreen text-darkgreen">
                    <b>{'>'}</b>
                </Cell>
                {daysOfWeek.map((day) => (
                    <Cell className="p-4 border-none bg-lightgreen text-darkgreen" key={day}>
                        <b> {day}</b>
                    </Cell>
                ))}
                {Array.from({ length: numberedStart }).map((number, index) => (
                    <Cell className={emptyCellCss} key={index} />
                ))}
                {Array.from({ length: calendarMonth.monthDuration }).map((day, index) => {
                    const date = index + 1;

                    let hasHoliday = false;

                    if (
                        monthlyHolidays[indexOfHolidays] &&
                        monthlyHolidays[indexOfHolidays].date.datetime.day === date
                    ) {
                        hasHoliday = true;
                        indexOfHolidays++;
                    }
                    return (
                        <Cell className={cellCss} key={date}>
                            <p>
                                <b>{date}</b>
                            </p>
                            {hasHoliday && (
                                <div className="text-center pt-2 w-full bg-lightgreen text-darkgreen p-4 mt-2 cursor-pointerline-clamp-3 overflow-hidden text-ellipsis">
                                    {monthlyHolidays[indexOfHolidays - 1].name}
                                </div>
                            )}
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
