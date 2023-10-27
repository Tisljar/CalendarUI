import { currentMonth } from './currentDate';
import { currentYear } from './currentDate';
import moment from 'moment';

export const getDate = (month = currentMonth, year = currentYear) => {
    const monthNum = parseInt(month);
    const date = moment([year, monthNum - 1]);
    const monthName = date.format('MMMM');
    const firstDateOfMonth = date.format('YYYY-MM-DD-ddd');
    const firstDayOfMonth = date.format('ddd');
    const lastDateOfMonth = date.endOf('month');
    const monthDuration = date.daysInMonth();
    const lastDayOfMonth = moment(lastDateOfMonth).format('ddd');
    const yearNum = date.format('YYYY');

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
