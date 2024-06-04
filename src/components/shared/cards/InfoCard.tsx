import Card from "./Card";

interface InfoCardProps {
    data: {value: number | null, message: string};
    icon: React.ReactNode;
    borderColor?: string;
    bgColorIcon?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({data, icon, borderColor='border-unno_sc-500', bgColorIcon='bg-unno_sc-500'}) => {
    return (
        <Card className={`min-w-[300px] max-w-[320px] h-auto border-l-4 m-4 hover:bg-dark_ud-100 transition-colors cursor-pointer ${borderColor}`}>
            <div className='flex flex-row items-center'>
                <div className='flex flex-col w-[60%] font-roboto'>
                    <span className='text-7xl font-semibold text-unno_pr-500'>{data.value !== null && data.value !== undefined ? data.value : '--'}</span>
                    <p className="text-unno_pr-500">{data.message}</p>
                </div>
                <div className={`flex justify-center items-center rounded-full h-20 w-20 mx-auto ${bgColorIcon} text-unno_pr-500`}>
                    {icon}
                </div>
            </div>
        </Card>
    )
}

export default InfoCard