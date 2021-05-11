const isNumeric = (str: string | number): boolean => {
  if (typeof str === "number") {
    return !isNaN(str)  
  } else {
    return !isNaN(parseFloat(str))
  }
}

const padded = (n: number): string => n < 10 ? `0${n}` : `${n}`;

const clamp = (min: number, max: number) => (val: unknown) => {
  const n = Number(val)
  if( n < min ){
      return min
  } else if( n > max ){
      return max
  } else {
      return n
  }
}

const isLeap = (year: number): boolean => {
  if(year % 4 === 0){
      if( year % 100 === 0 ){
          return year % 400 === 0;
      }
      return true;
  } 
  return false;
}

const limitDay = (day: number, month: number, year: number): number => {
  let result: number = 0;
  switch(month){
      case 1:
          result = isLeap(year) ? clamp(1,29)(day) : clamp(1,28)(day)
          break;
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
          result = clamp(1,31)(day);
          break;
      case 3:
      case 5:
      case 8:
      case 10:
          result = clamp(1,30)(day)
          break;
  }
  return result;
}

const limitMonth = clamp(1,12);

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

type Either<L,R> = {
  map<U>(fn: (r: R) => U): Either<L,U>;
  onLeft<U>(fn: (l: L) => U): U | R;
}

const Right = <L,R>(x: R): Either<L,R> => ({
  map<U>(fn: (x: R) => U){
    return Right(fn(x))
  },
  onLeft(){
    return x;
  }
})

const Left = <L,R>(x: L): Either<L,R> => ({
  map(){
    return Left(x)
  },
  onLeft<U>(fn: (x: L) => U){
    return fn(x);
  }
})

export const Either = {
  fromPredicate: <T>(pred: (x: T) => boolean, value: T ): Either<T,T> => {
    return pred(value) ? Right(value) : Left(value);
  }
}

const yearToNumber = (y: string): number => y.length < 4 ? 2000 + Number(y) : Number(y)

export const parseDate = (str: string): Either<string,Date> => {
  return Either.fromPredicate((data: string) => {
    const date = data.split("/");
    const [d,m,y] = date;
    return date.length === 3 && d.length <= 2 && m.length <= 2 && y.length >= 2 && date.every(isNumeric)  
  },str)
  .map(str => str.split("/"))
  .map(([d,m,y]) => {
    // TODO: Use format to figure this out
    const year = Number(y)
    const month = Number(m)
    const day = Number(d)
    return new Date(year,month,day)
  });
}

export const defaultMonthNames = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", "September", 
  "October", "November", "December"
];

export const defaultWeekdayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export const defaultDateFormatter = (d: Date) => `${padded(d.getDate())}/${padded(d.getMonth() + 1)}/${d.getFullYear() % 100}` 