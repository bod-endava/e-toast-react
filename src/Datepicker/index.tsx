import getClassName from 'getclassname';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { FormAPI } from '../Form/API';
import { useClickOutsideDetector } from '../commons/hooks/useClickOutsideDetector';
import { 
  defaultMonthNames, 
  defaultWeekdayNames, 
  getCellData, 
  parseDateWith, 
  ValueCell, 
  DateFormatter, 
  defualtFormat, 
  dateFormatterOf, 
  compose 
} from './date-utils';

export type MonthMapper = string[] | ((n: number) => string);
export type WeekdayMapper = string[] | ((n: number) => string);
export type { DateFormatter };

interface DatepickerPropsWithoutRef {
  /**
   * Id passed to the underlying input. Will default to label prop
   */
  id?: string;
  /**
   * Name passed to the underlying input. Will default to label prop
   */
  name?: string;
  /**
   * Text to be used as label for the datepicker
   */
  label?: string;
  /**
   * Whether the datepicker is disabled or not
   */
  disabled?: boolean;
  /**
   * Initial value of the datepicker. If it is a string, it must be a valid date string representation.
   * Defaults to current day if string is not a valid date
   */
  initialValue?: string | Date;
  /**
   * An array or function that maps the index of the day of the week to the abreviation to be used in the calendar.
   * Days of the week are 0-indexed starting at Sunday as 0.
   */
  weekdays?: WeekdayMapper;
  /**
   * An array or function that maps the index of the month to the name to be used in the calendar.
   * Months are 0-indexed starting at January as 0.
   */
  months?: MonthMapper;
  /**
   * Format string or formatter object to use to parse and format the text inside the input.
   * When manually changing the input text, the calendar popup will only update if the text matches the format or
   * if the formatter is able to parse the text
   * 
   * A formatter object is an object with a "parseDate" and "formatDate" function. "parseDate" should 
   * either throw or return undefined when a date text is not a valid format. 
   * 
   * By default, valid formats are any format that only uses the following tokens to define the format:
   * 
   * DD   : Two-digit day format
   * 
   * MM   : Two-digit month format
   * 
   * YYYY : four-digit year
   * 
   * YY   : two-digit year
   * 
   * Any other characters can be used to separate the tokens and only one token per time unit 
   * (e.g. "YYYY-YY-DD" will not work as expected)
   */
  format?: string | DateFormatter;
  /**
   * Handler for when the date changes.
   * @param value Raw text in the input
   * @param date Parsed date if value is valid date. Otherwise it will be undefined
   */
  onChange?: (value: string, date?: Date) => void;
  /**
   * props to pass to the underlying input
   */
  inputProps?: React.ComponentPropsWithoutRef<"input">;
  /**
   * placeholder to be used in the input
   */
  placeholder?: string;
  /**
   * **This prop is only used for automatic form handling should not be used directly**
   * Form API object used to hook input to form state. Normally, this prop is passed automatically by the form.
   */
  formAPI?: FormAPI<any>;
}

export type DatepickerProps = DatepickerPropsWithoutRef & {
  /**
   * Ref to the inner input component
   */
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export type DatepickerInnerElement = HTMLInputElement

/**
 * E-toast flavor of a datepicker. Has a limited set of features, including limited date formatting, 
 * interface for custom date formatting, and month and day i18n options.
 */
const Datepicker = React.forwardRef<DatepickerInnerElement, DatepickerPropsWithoutRef>(({
  id,
  label,
  name,
  disabled,
  weekdays: rawWeekdays = defaultWeekdayNames,
  months: rawMonths = defaultMonthNames,
  format: rawFormat = defualtFormat,
  formAPI,
  onChange = () => {},
  inputProps = {},
  initialValue: rawInit,
  placeholder
}, ref) => {
  const formatter: DateFormatter = useMemo(() => typeof rawFormat === "string" ? dateFormatterOf(rawFormat) : rawFormat, [rawFormat]);
  const formatDate = useMemo(() => (d: Date) => formatter.formatDate(d),[formatter]);
  const parseDate = parseDateWith(formatter)
  const initialValue = typeof rawInit === "string" ? parseDate(rawInit).onLeft(() => new Date) : rawInit;

  const [ isCalendarVisible, setCalendarVisibility ] = useState(false);
  const toggleCalendar = () => !disabled  && setCalendarVisibility(x => !x)

  const [ temporalDate, setTemporalDate ] = useState(initialValue ?? new Date);
  const [ selectedDate, rawSetSelectedDate ] = useState(initialValue === undefined ? "" : formatDate(initialValue));

  const wrapValue = (value: string, name: string) => ({ target: { type: "date", value, name } } as unknown as ChangeEvent);
  
  const setSelectedDate = (d: Date) => {
    rawSetSelectedDate(formatDate(d))
    setTemporalDate(d)
    formAPI?.handleChange?.(wrapValue(formatDate(d),(name || id || label) as string));
    onChange(formatDate(d),d)
  }

  const handleCellClick = ({ type, value }: ValueCell) => () => {
    const newDate = new Date();
    newDate.setFullYear(temporalDate.getFullYear())
    newDate.setMonth( type === "normal" ? temporalDate.getMonth() : temporalDate.getMonth() + (type === "nextPadding" ? 1 : -1))
    newDate.setDate(value);
    setSelectedDate(newDate)
  }

  const handleInput = (e) => {
    parseDate(e.target.value)
    .map(setSelectedDate)
    .onLeft(str => {
      formAPI?.handleChange?.(wrapValue(str,(name || id || label) as string))
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

  const calendarRef = useClickOutsideDetector<HTMLDivElement>(() => setCalendarVisibility(false))

  const datepickerClass = getClassName({ base: "eds-datepicker" });
  const labelClass = datepickerClass.extend("&__label")
  const containerClass = datepickerClass.extend("&__container");
  const iconClass = datepickerClass.extend("&__icon");
  const calendarClass = datepickerClass.extend("&__calendar").recompute({ "&--off": disabled || !isCalendarVisible })

  const calendarHeaderClass = calendarClass.extend("&__header");
  const calendarContentClass = calendarClass.extend("&__content");

  const calendarHeaderButtonClass = calendarHeaderClass.extend("&__button")
  const calendarLeftButtonClass = calendarHeaderButtonClass.extend("& &--left");
  const calendarRightButtonClass = calendarHeaderButtonClass.extend("& &--right");
  const calendarLabelClass = calendarHeaderClass.extend("&__label");

  const calendarCellClass = calendarClass.extend("&__cell");
  const weekdayCellClass = calendarCellClass.extend("& &--weekday");
  const paddingCellClass = calendarCellClass.extend("& &--grayed-out")

  const rootProps: any = {
    className: datepickerClass,
    disabled,
  }

  return <div {...rootProps}>
    {label && <label className={labelClass} htmlFor={id || label}>{label}</label>}
    <div className={containerClass}>
      <input
        type="text"
        id={id || label}
        name={name || label}
        disabled={disabled}
        placeholder={placeholder} 
        ref={ref} 
        value={selectedDate}
        onChange={handleInput}
        {...inputProps}
      />
      <div className={iconClass} onClick={toggleCalendar}>calendar</div>
    </div>
    <div className={calendarClass} ref={calendarRef}>
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
            const handler = cell.type === "weekday" ? () => {} : compose(toggleCalendar, handleCellClick(cell));
            return <div key={`${type}-${value}`} className={className} onClick={handler}>{value}</div>
          })
        }
      </div>
    </div>
  </div>
})

export default Datepicker
