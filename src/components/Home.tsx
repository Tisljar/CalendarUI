import { IHoliday, IMonthlyHolidays } from '../helpers/interface/IMonthlyHolidays';
import Calendar from './Calendar';
import Loader from './Loader/Loader';

type props = {
    isLoad: boolean;
    holidayData: IMonthlyHolidays;
    monthData: Array<IHoliday>;
    getData: Function;
    yearData: string;
    monthInfo: string;
};

const Home = ({ isLoad, holidayData, monthData, getData, yearData, monthInfo }: props) => {
    if (!isLoad) {
        return <Loader />;
    }
    return (
        <Calendar
            holidayData={holidayData}
            monthData={monthData}
            getData={getData}
            yearData={yearData}
            monthInfo={monthInfo}
        />
    );
};

export default Home;
