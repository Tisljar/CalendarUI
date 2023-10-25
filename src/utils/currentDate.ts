import moment from 'moment';

const currentDate = moment();
export const currentYear = currentDate.format('YYYY');
export const currentMonth = currentDate.format('MM');
