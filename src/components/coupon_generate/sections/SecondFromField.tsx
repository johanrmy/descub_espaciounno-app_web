import InputRadio from "@components/shared/inputs/InputRadio";
import { CalendarMonth, CalendarRange } from "@components/shared/extra/Calendar";
import React, { useEffect, useState } from "react";

interface SecondGroupFieldsProps {
    couponGenerateData: CouponGenerateRequestEntry;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleDateChange: (start: string, end: string) => void;
}

const SecondGroupFields: React.FC<SecondGroupFieldsProps> = ({
    couponGenerateData,
    handleInputChange,
    handleDateChange,
    }) => {
    const [startDate, setStartDay] = useState<string>(couponGenerateData.valid_from);
    const [endDate, setEndDay] = useState<string>(couponGenerateData.valid_until);

    const handleRangeCalendarChange = (event: any) => {
        const [start, end] = event.target.value.split('/');
        setStartDay(start);
        setEndDay(end);

        handleDateChange(start, end);
    };

    useEffect(() => {
        setStartDay(couponGenerateData.valid_from);
        setEndDay(couponGenerateData.valid_until);
    }, [couponGenerateData]);
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
        <div className="box-border mb-6">
            <span className="text-unno_pr-500 font-roboto font-normal text-base inline-block mb-2">Rango de validación</span>
            <div className="flex flex-row justify-center bg-dark_ud-50 rounded-lg w-auto shadow-md border p-5">
                <CalendarRange
                    months={2}
                    firstDayOfWeek={0}
                    value={`${startDate}/${endDate}`}
                    onChange={handleRangeCalendarChange}
                >
                    <svg
                    aria-label="Previous"
                    slot="previous"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    {...({} as React.HTMLAttributes<SVGElement>)}
                    >
                    <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                    </svg>
                    <svg
                    aria-label="Next"
                    slot="next"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    {...({} as React.HTMLAttributes<SVGElement>)}
                    >
                    <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                    </svg>
                    <div className="flex flex-col lg:flex-row xl:flex-col 2xl:flex-row">
                        <CalendarMonth></CalendarMonth>
                        <CalendarMonth offset={1}></CalendarMonth>
                    </div>
                </CalendarRange>
            </div>
        </div>
        <div className="box-border mb-6">
            <span className="text-unno_pr-500 font-roboto font-normal text-base inline-block">¿Activar cupones?</span>
            <div className="flex row justify-center mt-6">
            <InputRadio checked={couponGenerateData.status.toString() === 'true'} name="status" value="true" onChange={handleInputChange}>Si</InputRadio>
            <InputRadio checked={couponGenerateData.status.toString() === 'false'} name="status" value="false" onChange={handleInputChange}>No</InputRadio>
            </div>
        </div>
        <button
            type="submit"
            className="bg-unno_pr-500 text-white font-semibold py-2 px-4 rounded shadow"
        >
            Guardar
        </button>
        <script type="module" src="https://unpkg.com/cally"></script>
        </div>
    );
};

export default SecondGroupFields;
