import { useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import { IHoliday, IMonthlyHolidays } from './helpers/interface/IMonthlyHolidays';
import './index.css';
import { getDate } from './utils/getDate';
import { currentMonth, currentYear } from './utils/currentDate';
import getEvents from './utils/getEvents';
import Home from './components/Home';

const App = (): JSX.Element => {
    const getYearlyEvents = async (year: string) => {
        try {
            const data = await getEvents(year);
            return data;
        } catch (error) {
            console.log('Error occurred: ', error);
            return null;
        }
    };

    const getData = (year = currentMonth, month = currentMonth) => {
        setIsLoad(false);
        getYearlyEvents(year).then((data) => {
            if (data) {
                setHolidayData(data.response);
                const holidaysInTargetMonth = data.response.holidays.filter((holiday: IHoliday) => {
                    return holiday.date.datetime.month === parseInt(month);
                });
                setMonthData(holidaysInTargetMonth);
                setYearData(year);
                setMonthInfo(month);
                setIsLoad(true);
            } else {
                console.log('Error occurred.');
            }
        });
    };
    const [monthInfo, setMonthInfo] = useState(currentMonth);
    const [yearData, setYearData] = useState(currentYear);
    const [isLoad, setIsLoad] = useState(false);
    const [holidayData, setHolidayData] = useState<IMonthlyHolidays>({ holidays: [] });
    const [monthData, setMonthData] = useState<Array<IHoliday>>([]);

    useEffect(() => {
        getData(yearData, monthInfo);
    }, []);

    return (
        <div className="App">
            <Home
                isLoad={isLoad}
                holidayData={holidayData}
                monthData={monthData}
                getData={getData}
                yearData={yearData}
                monthInfo={monthInfo}
            />
        </div>
    );
};

export default App;
