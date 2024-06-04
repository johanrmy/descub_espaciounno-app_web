import {
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    type RefObject,
    type PropsWithChildren,
  } from "react";
  
  import "cally";
  import type {
    CalendarRangeProps,
    CalendarMonthProps,
    CalendarDateProps,
  } from "cally";
  
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        "calendar-month": unknown;
        "calendar-range": unknown;
        "calendar-date": unknown;
      }
    }
  }
  
  function useListener(
    ref: RefObject<HTMLElement>,
    event: string,
    listener?: (e: Event) => void
  ) {
    useEffect(() => {
      const current = ref.current;
  
      if (current && listener) {
        current.addEventListener(event, listener);
        return () => current.removeEventListener(event, listener);
      }
    }, [ref, event, listener]);
  }
  
  function useProperty(ref: RefObject<HTMLElement>, prop: string, value?: any) {
    useEffect(() => {
      if (ref.current) {
        // @ts-expect-error - TS doesn't know that `prop` is a key
        ref.current[prop] = value;
      }
    }, [ref, prop, value]);
  }
  
  export const CalendarMonth = forwardRef(function CalendarMonth(
    props: CalendarMonthProps,
    forwardedRef
  ) {
    return (
      <>
            <style>
        {`
          calendar-month {
            --color-accent: #FEA82F;
            --color-text-on-accent: #ffffff;

            &::part(button) {
              border-radius: 3px;
            }
        
            &::part(range-inner) {
              border-radius: 0;
              background-color: #FECA80;
            }
        
            &::part(range-start) {
              border-start-end-radius: 0;
              border-end-end-radius: 0;
            }
        
            &::part(range-end) {
              border-start-start-radius: 0;
              border-end-start-radius: 0;
            }
        
            &::part(range-start range-end) {
              border-radius: 3px;
            }
          }
        `}
      </style>
      <calendar-month offset={props.offset} ref={forwardedRef} />
      </>
    );
  });
  
  export const CalendarRange = forwardRef(function CalendarRange(
    {
      onChange,
      showOutsideDays,
      firstDayOfWeek,
      isDateDisallowed,
      ...props
    }: PropsWithChildren<CalendarRangeProps>,
    forwardedRef
  ) {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current, []);
    useListener(ref, "change", onChange);
    useProperty(ref, "isDateDisallowed", isDateDisallowed);
  
    return (
      <>
        <style>
        {`
        calendar-range {
          svg {
            height: 16px;
            width: 16px;
            fill: none;
            stroke: currentColor;
            stroke-width: 1.5;
          }
      
          path {
            stroke-linecap: round;
            stroke-linejoin: round;
          }
      
          &::part(button) {
            border: 1px solid #adb5bd;
            background-color: #fff;
            border-radius: 3px;
            width: 26px;
            height: 26px;
          }
      
          &::part(button):focus-visible {
            outline: 2px solid #7048e8;
          }
        }
        `}
      </style>
        <calendar-range
          ref={ref}
          show-outside-days={showOutsideDays || undefined}
          first-day-of-week={firstDayOfWeek}
          {...props}
        >
        </calendar-range>
      </>
    );
  });
  
  export const CalendarDate = forwardRef(function CalendarDate(
    {
      onChange,
      showOutsideDays,
      firstDayOfWeek,
      isDateDisallowed,
      ...props
    }: PropsWithChildren<CalendarDateProps>,
    forwardedRef
  ) {
    const ref = useRef<HTMLElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current, []);
    useListener(ref, "change", onChange);
    useProperty(ref, "isDateDisallowed", isDateDisallowed);
  
    return (
      <calendar-date
        ref={forwardRef}
        show-outside-days={showOutsideDays ? "" : undefined}
        first-day-of-week={firstDayOfWeek}
        {...props}
      />
    );
  });