import { currentMonth } from './currentDate';
import { currentYear } from './currentDate';
import moment from 'moment';

export const getDate = (month = currentMonth, year = currentYear) => {
    // console.log(month, year);
    const monthNum = parseInt(month);
    const date = moment([year, monthNum - 1]);
    // console.log(date);
    const monthName = date.format('MMMM');
    // console.log(monthName);
    const firstDateOfMonth = date.format('YYYY-MM-DD-ddd');
    const firstDayOfMonth = date.format('ddd');
    const lastDateOfMonth = date.endOf('month');
    console.log(lastDateOfMonth);
    // console.log(firstDateOfMonth);
    const monthDuration = date.daysInMonth();
    const lastDayOfMonth = moment(lastDateOfMonth).format('ddd');
    const yearNum = date.format('YYYY');
    // console.log(yearNum);
    console.log({
        firstDateOfMonth: firstDateOfMonth,
        firstDayOfMonth: firstDayOfMonth,
        lastDateOfMonth: lastDateOfMonth.format('YYYY-MM-DD-ddd'),
        lastDayOfMonth: lastDayOfMonth,
        monthDuration: monthDuration,
        monthName: monthName,
        year: yearNum,
    });

    return {
        firstDateOfMonth: firstDateOfMonth,
        firstDayOfMonth: firstDayOfMonth,
        lastDateOfMonth: lastDateOfMonth.format('YYYY-MM-DD-ddd'),
        lastDayOfMonth: lastDayOfMonth,
        monthDuration: monthDuration,
        monthName: monthName,
        year: yearNum,
    };
};
