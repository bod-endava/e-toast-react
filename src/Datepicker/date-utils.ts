import * as E from '../commons/structures/either'

const padded = (n: number): string => n < 10 ? `0${n}` : `${n}`;
const genNumber = (start: number, amount: number, delta: number ) => {
  const res: number[] = []
  let cur = 0
  for(let i = start ; cur < amount ; i += delta){
    res.push(i);
    cur++;
  }
  return res
}

const genPrevious = (n: number, today: Date ) => {
  const lastDayOfPrev = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  return genNumber(lastDayOfPrev,n,-1).reverse();
}

const genNext = (n: number) => genNumber(1,n,1);

export type ValueCell = {
  type: "normal" | "prevPadding" | "nextPadding",
  value: number
}
export type WeekdayCell = {
  type: "weekday",
  value: string,
}
export type CalendarCell =  ValueCell | WeekdayCell 

const ofPrev = (value: number): CalendarCell => ({ value, type: "prevPadding" })
const ofNext = (value: number): CalendarCell => ({ value, type: "nextPadding" })
const ofWeekday = (value: string): CalendarCell => ({ value, type: "weekday" })
const ofNormal  = (value: number): CalendarCell => ({ value, type: "normal"  })

export const getCellData = (today: Date, weekdayNames: (n: number) => string ): CalendarCell[] => {
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const weekdays = genNumber(0,7,1).map(weekdayNames).map(ofWeekday);
    const beforePadding = genPrevious(firstDayOfMonth.getDay(),today).map(ofPrev);
    const days = genNumber(1,lastDayOfMonth.getDate(),1).map(ofNormal);
    const afterPadding = genNext(6 - lastDayOfMonth.getDay()).map(ofNext);

    return weekdays.concat(beforePadding).concat(days).concat(afterPadding);
}

export interface DateFormatter {
  parseDate(str: string, format?: string): Date | undefined;
  formatDate(date: Date, format?: string): string; 
}

export const parseDateWith = (formatter: DateFormatter) => (str: string): E.Either<string,Date> => {
  try {
    const res = formatter.parseDate(str);
    if( res === undefined ){
      return E.left(str)
    } else {
      return E.right(res)
    }
  } catch {
    return E.left(str)
  }
}

export const defaultMonthNames = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", "September", 
  "October", "November", "December"
];

export const defaultWeekdayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export const defualtFormat = "DD/MM/YY";

const matchFormat = (str: string, format: string): boolean => {
  const reg = format
    .replace(/DD/gi,`(0[1-9]|[12][0-9]|3[01])`)
    .replace(/MM/gi, `(0[1-9]|1[12])`)
    .replace(/YYYY/gi,`([0-9][0-9][0-9][0-9])`)
    .replace(/YY/gi,`([0-9][0-9])`)
  const regex = new RegExp(reg);
  
  return regex.test(str);
}

const getDataFromFormat = (str: string, format: string): [string,string,string] => {
  const reg = format
    .replace(/DD/gi,`(?<day>0[1-9]|[12][0-9]|3[01])`)
    .replace(/MM/gi, `(?<month>0[1-9]|1[12])`)
    .replace(/YYYY/gi,`(?<year>[0-9][0-9][0-9][0-9])`)
    .replace(/YY/gi,`(?<year>[0-9][0-9])`)
  const regex = new RegExp(reg);
  const { day="", month="", year="" } = str.match(regex)?.groups || {}
  return [day,month,year]
}

export const dateFormatterOf = (format: string): DateFormatter => ({
  formatDate(date: Date){
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return format
      .replace(/DD/gi,`${padded(day)}`)
      .replace(/MM/gi, `${padded(month + 1)}`)
      .replace(/YYYY/gi,`${year}`)
      .replace(/YY/gi,`${year % 100}`)
  },
  parseDate(str: string){
    const data = getDataFromFormat(str,format)
    let [ day, month, year ] = data.map(Number);
    year = format.includes("YYYY") ? year : 2000 + year
    if(matchFormat(str,format) && !isNaN(Date.parse(`${year}-${month}-${day}`))){
      return  new Date(year, month-1, day);
    }
    return undefined
  }
})

export const compose = <A extends [],B,C>(f: (b: B) => C, g: (...a: A) => B ) => (...args: A) => f(g(...args))