import { arrays } from "./lunarTable";

function lunarCalc(lunarDate){
    const smd = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                year = lunarDate.substring(0, 4),
                month = lunarDate.substring(4, 6),
                day = lunarDate.substring(6, 8);

    let lunYear = year,
        lunMonth = month;
    let lunDay, leap;
    let solYear, solMonth, solDay;
    let lunIndex, m1, md, y2, td, i, j, yy;

    lunIndex = lunYear - 1841;
    m1 = lunMonth - 1;
    leap = 0;

    lunDay = day;
    td = 0;
    for(i = 0; i < lunIndex; i++){
        for (j=0; j<12; j++) {
            switch (arrays[i][j]) {
                case 1:
                        td = td + 29;
                        break;
                case 2:
                        td = td + 30;
                        break;
                case 3:
                        td = td + 58;    // 29+29
                        break;
                case 4:
                        td = td + 59;    // 29+30
                        break;
                case 5:
                        td = td + 59;    // 30+29
                        break;
                case 6:
                        td = td + 60;    // 30+30
                        break;
            }
        }
    }
    for (j=0; j<m1; j++) {
        switch (arrays[lunIndex][j]) {
            case 1:
                    td = td + 29;
                    break;
            case 2:
                    td = td + 30;
                    break;
            case 3:
                    td = td + 58;    // 29+29
                    break;
            case 4:
                    td = td + 59;    // 29+30
                    break;
            case 5:
                    td = td + 59;    // 30+29
                    break;
            case 6:
                    td = td + 60;    // 30+30
                    break;
        }
    }
    if (leap == 1) {
        switch(arrays[lunIndex][m1]) {
            case 3:
            case 4:
                    td = td + 29;
                    break;
            case 5:
            case 6:
                    td = td + 30;
                    break;
        }
    }

    td = td + parseFloat(lunDay) + 22;
    lunIndex = 1840;
    do{
        lunIndex = lunIndex + 1;
        if( (lunIndex % 400 == 0) || ( (lunIndex % 100 != 0) && (lunIndex % 4 == 0) ) ){
            y2 = 366;
        } else{
            y2 = 365
        }
        if(td <= y2){
            break
        } else{
            td = td - y2
        }
    } while(1);
        solYear = lunIndex;
        smd[1] = y2 - 337;
        m1 = 0;
    do{
        m1 = m1 + 1;
        if(td <= smd[m1 - 1]){
            break
        } else{
            td = td - smd[m1 - 1];
        }
    } while(1);
    solMonth = m1 < 10? `0${m1}`: m1;
    solDay = td < 10? `0${td}`: td;
    yy = solYear - 1;
    td = yy * 365 + yy/4 - yy/100 + yy/400;

    return `${solMonth + solDay}`

}

export {lunarCalc}