<script>
    import styles from "./assets/css/style.css?inline";
    import classNames from "classnames/bind";
    import Top from "./components/top/Top.svelte";
    import Day from "./components/day/Day.svelte";
    import Calendar from "./components/calendar/Calendar.svelte";
    import { lunarCalc } from "./assets/js/lunarCalc";

    const cx = classNames.bind(styles);

    const solarHolidays = ["0101", "0301", "0505", "0606", "0815", "1003", "1225"],
                solarHoliName = ["신년", "삼일절", "어린이날", "현충일", "광복절", "개천절", "크리스마스"];
    let lunarHolidays = ["0101", "0102", "0408", "0814", "0815", "0816"],
        lunarHoliName = ["설날", "", "부처님 오신날", "", "추석", ""];

    const fullMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                fullDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const date = new Date(),
                utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000),
                kstGap = 9 * 60 * 60 * 1000,
                today = new Date(utc + kstGap);

    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let currentYear = thisMonth.getFullYear(),
            currentMonth = thisMonth.getMonth();

    $: currentYear, currentMonth, initMonth();
    
    var days = [];
    var transferLunar = [];
    
    lunarHolidays.forEach(x => {
        transferLunar.push(lunarCalc(currentYear + x));
    });

    var lastMonth = new Date(currentYear, transferLunar[0].substring(0,2)-1, transferLunar[0].substring(2,4)-1).toLocaleDateString().split('.')[1].replace(' ', '');
    var lastDate = new Date(currentYear, transferLunar[0].substring(0,2)-1, transferLunar[0].substring(2,4)-1).toLocaleDateString().split('.')[2].replace(' ', '');
    var lastDay = `${lastMonth < 10? `0`+(lastMonth): lastMonth}${lastDate < 10? `0`+lastDate: lastDate}`;
    

    function initMonth(){
        days = [];

        let startDay = new Date(currentYear, currentMonth, 0),
            prevDate = startDay.getDate(),
            prevDay =   startDay.getDay(),
            prevDateStart = prevDate - prevDay;
    
        let endDay = new Date(currentYear, currentMonth+1, 0),
            nextDate = endDay.getDate(),
            nextDay = endDay.getDay(),
            nextDateEnd = 6 - nextDate == 6? 0: 6 - nextDay;

        if(prevDay < 6){
            for(var i = prevDateStart; i <= prevDate; i++){
                days.push({
                    num: new Date(currentYear, currentMonth-1, i),
                    enabled: false
                });
            }
        }
        for(var i = 1; i <= nextDate; i++){
            if(today.getDate() == i){
                days.push({
                    num: new Date(currentYear, currentMonth, i),
                    enabled: true,
                    edit: false,
                    script: (currentYear == thisMonth.getFullYear() && currentMonth == thisMonth.getMonth() && i == thisMonth.getDate())?
                    [{text: '할 일을 입력하세요(더블클릭)', done: false, active: false}]: [{text: '', done: false, active: false}],
                    utcDate:`${currentMonth+1 < 10? `0`+(currentMonth+1): currentMonth+1}${i<10? `0`+i: i}`
                });
            } else{
                days.push({
                    num: new Date(currentYear, currentMonth, i),
                    enabled: true,
                    edit: false,
                    script: [{text: '', done: false, active: false}],
                    utcDate:`${currentMonth+1 < 10? `0`+(currentMonth+1): currentMonth+1}${i<10? `0`+i: i}`
                });
            }
        }
        for(var i = 1; i <= nextDateEnd; i++){
            days.push({
                num: new Date(currentYear, currentMonth+1, i),
                enabled: false
            });
        }
    }
    
    function prev(){
        if(currentMonth == 0){
            currentMonth = 11;
            currentYear--
        } else currentMonth--;
        days = days;
        var transferLunarUpdate = []
        lunarHolidays.forEach(x => {
            transferLunarUpdate.push(lunarCalc(currentYear + x));
        });
        transferLunar = transferLunarUpdate;
        lastMonth = new Date(currentYear, transferLunar[0].substring(0,2)-1, transferLunar[0].substring(2,4)-1).toLocaleDateString().split('.')[1].replace(' ', '');
        lastDate = new Date(currentYear, transferLunar[0].substring(0,2)-1, transferLunar[0].substring(2,4)-1).toLocaleDateString().split('.')[2].replace(' ', '');
        lastDay = `${lastMonth < 10? `0`+(lastMonth): lastMonth}${lastDate < 10? `0`+lastDate: lastDate}`;
    }

    function next(){
        currentMonth++;
        if(currentMonth == 12){
            currentYear++;
            currentMonth = 0;
        }
        var transferLunarUpdate = []
        lunarHolidays.forEach(x => {
            transferLunarUpdate.push(lunarCalc(currentYear + x));
        });
        transferLunar = transferLunarUpdate;
        lastMonth = new Date(currentYear, transferLunar[0].substring(0,2)-1, transferLunar[0].substring(2,4)-1).toLocaleDateString().split('.')[1].replace(' ', '');
        lastDate = new Date(currentYear, transferLunar[0].substring(0,2)-1, transferLunar[0].substring(2,4)-1).toLocaleDateString().split('.')[2].replace(' ', '');
        lastDay = `${lastMonth < 10? `0`+(lastMonth): lastMonth}${lastDate < 10? `0`+lastDate: lastDate}`;
    }
</script>

<main>
    <h1 class="blind">calendar</h1>
    <Top year={currentYear} month={fullMonth[currentMonth]} {prev} {next} />
    <Day {fullDay} />
    <Calendar {days} {thisMonth} {cx} {solarHolidays} {transferLunar} {solarHoliName} {lunarHoliName} {lastDay} />
</main>