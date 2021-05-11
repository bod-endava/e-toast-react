import getClassName from 'getclassname';
import React, { useEffect, useMemo, useState } from 'react';
import { defaultDateFormatter, defaultMonthNames, defaultWeekdayNames, getCellData, parseDate, ValueCell } from './date-utils';

interface DatepickerPropsWithoutRef {
  weekdays?: string[] | ((str: number) => string);
  months?: string[] | ((str: number) => string);
  formatDate?: (date: Date) => string;
  onChange?: (date: string) => void;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
}

export type DatepickerProps = DatepickerPropsWithoutRef & {
  /**
   * Ref to the inner input component
   */
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export type DatepickerInnerElement = HTMLInputElement

const Datepicker = React.forwardRef<DatepickerInnerElement, DatepickerPropsWithoutRef>(({
  weekdays: rawWeekdays = defaultWeekdayNames,
  months: rawMonths = defaultMonthNames,
  formatDate = defaultDateFormatter,
  onChange = () => {},
  inputProps = {}
}, ref) => {
  const [ isCalendarVisible, setCalendarVisibility ] = useState(false);
  const toggleCalendar = () => setCalendarVisibility(x => !x)
  const [ temporalDate, setTemporalDate ] = useState(new Date);
  const [ selectedDate, rawSetSelectedDate ] = useState(formatDate(new Date));
  const setSelectedDate = (d: Date) => {
    rawSetSelectedDate(formatDate(d))
    setTemporalDate(d)
    onChange(formatDate(d))
  }

  const handleCellClick = ({ type, value }: ValueCell) => () => {
    const newDate = new Date();
    newDate.setFullYear(temporalDate.getFullYear())
    newDate.setMonth( type === "normal" ? temporalDate.getMonth() : temporalDate.getMonth() + (type === "nextPadding" ? 1 : -1))
    newDate.setDate(value);
    setSelectedDate(newDate)
  }

  const handleInput = (e) => {
    const rawData = e.target.value;
    parseDate(rawData)
    .map(setSelectedDate)
    .onLeft(str => {
      onChange(str)
      rawSetSelectedDate(str)
    })
  }

  const handleChangeMonth = (amount) => () => {
    const newDate = new Date();
    newDate.setFullYear(temporalDate.getFullYear())
    newDate.setMonth(temporalDate.getMonth() + amount)
    newDate.setDate(temporalDate.getDate());
    setTemporalDate(newDate)
  }

  const callOrAccess = (fn: string[] | ((n: number) => string)) => (n: number) => typeof fn === "function" ? fn(n) : fn[n]
  const months = useMemo(() => callOrAccess(rawMonths), [rawMonths])
  const weekdays = useMemo(() => callOrAccess(rawWeekdays), [rawWeekdays])
  useEffect(() => {
    setSelectedDate(temporalDate)
  },[formatDate])

  const datepickerClass = getClassName({ base: "eds-datepicker" });
  const containerClass = datepickerClass.extend("&__container");
  const iconClass = datepickerClass.extend("&__icon");
  const calendarClass = datepickerClass.extend("&__calendar").recompute({ "&--off": !isCalendarVisible })

  const calendarHeaderClass = calendarClass.extend("&__header");
  const calendarContentClass = calendarClass.extend("&__content");

  const calendarHeaderButtonClass = calendarHeaderClass.extend("&__button")
  const calendarLeftButtonClass = calendarHeaderButtonClass.extend("& &--left");
  const calendarRightButtonClass = calendarHeaderButtonClass.extend("& &--right");
  const calendarLabelClass = calendarHeaderClass.extend("&__label");

  const calendarCellClass = calendarClass.extend("&__cell");
  const weekdayCellClass = calendarCellClass.extend("& &--weekday");
  const paddingCellClass = calendarCellClass.extend("& &--grayed-out")

  return <div className={datepickerClass}>
    <div className={containerClass}>
      <input 
        type="text" 
        placeholder="DD/MM/YY" 
        ref={ref} 
        value={selectedDate}
        onChange={handleInput}
        {...inputProps}
      />
      <div className={iconClass} onClick={toggleCalendar}>calendar</div>
    </div>
    <div className={calendarClass}>
      <div className={calendarHeaderClass}>
        <div className={calendarLeftButtonClass} onClick={handleChangeMonth(-1)}>chevron left</div>
        <div className={calendarLabelClass}>
          {months(temporalDate.getMonth())} {temporalDate.getFullYear()}
        </div>
        <div className={calendarRightButtonClass} onClick={handleChangeMonth(1)}>chevron right</div>
      </div>
      <div className={calendarContentClass}>
        {
          getCellData(temporalDate, weekdays).map((cell) => {
            const { type, value } = cell;
            const className = {
              normal: calendarCellClass,
              weekday: weekdayCellClass,
              prevPadding: paddingCellClass, 
              nextPadding: paddingCellClass, 
            }[type];
            let handler = () => {};
            if( cell.type !== "weekday" ){
              handler = () => {
                handleCellClick(cell)()
                toggleCalendar()
              } 
            }
            return <div className={className} onClick={handler}>{value}</div>
          })
        }
      </div>
    </div>
  </div>
  
})

export default Datepicker
