import { currentMonth } from './currentDate';
import { currentYear } from './currentDate';
import moment from 'moment';

export const getDate = (month = currentMonth, year = currentYear) => {
    console.log(month, year);
    const monthName = moment(month).format('MMMM');
    // console.log(monthName);
    const firstDateOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD-ddd');
    const firstDayOfMonth = moment(firstDateOfMonth).format('ddd');
    const lastDateOfMonth = moment(firstDateOfMonth).endOf('month');
    const lastDayOfMonth = moment(lastDateOfMonth).format('ddd');
    const monthDuration = lastDateOfMonth.diff(firstDateOfMonth, 'days') + 1;
    const yearNum = moment(year).format('YYYY');
    // console.log(yearNum);

    return {
        firstDateOfMonth: firstDateOfMonth.format('YYYY-MM-DD-ddd'),
        firstDayOfMonth: firstDayOfMonth,
        lastDateOfMonth: lastDateOfMonth.format('YYYY-MM-DD-ddd'),
        lastDayOfMonth: lastDayOfMonth,
        monthDuration: monthDuration,
        monthName: monthName,
        year: yearNum,
    };
};
