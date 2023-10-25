import { currentMonth } from './currentDate';
import { currentYear } from './currentDate';
import moment from 'moment';

export const getDate = (month = currentMonth, year = currentYear) => {
    const monthName = moment(currentMonth).format('MMMM');
    console.log(monthName);
    const firstDateOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD-ddd');
    const firstDayOfMonth = moment(firstDateOfMonth).format('ddd');
    const lastDateOfMonth = moment(firstDateOfMonth).endOf('month');
    const lastDayOfMonth = moment(lastDateOfMonth).format('ddd');
    const monthDuration = lastDateOfMonth.diff(firstDateOfMonth, 'days') + 1;

    return {
        firstDateOfMonth: firstDateOfMonth.format('YYYY-MM-DD-ddd'),
        firstDayOfMonth: firstDayOfMonth,
        lastDateOfMonth: lastDateOfMonth.format('YYYY-MM-DD-ddd'),
        lastDayOfMonth: lastDayOfMonth,
        monthDuration: monthDuration,
        monthName: monthName,
    };
};
