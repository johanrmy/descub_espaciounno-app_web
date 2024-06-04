import Input from "@components/shared/inputs/Input";
import InputBtn from "@components/shared/inputs/InputBtn";
import { NumberInputValidKeys } from "@data/enums/inputValidKeys";
import { AiOutlinePercentage } from "react-icons/ai";
import { RiCoupon2Line } from "react-icons/ri";

interface FirstGroupFields {
    couponGenerateData: CouponGenerateRequestEntry,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    AmountInputReadonly?: boolean;
}

const FirstGroupFields: React.FC<FirstGroupFields> = ({
    couponGenerateData,
    handleInputChange,
    AmountInputReadonly = false,
}) => {
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
            <div className="box-border mb-6">
                <Input
                label="description"
                labelName="Descripción"
                type="text"
                nameid="description"
                onChange={handleInputChange}
                value={couponGenerateData.description}
                required={true}
                placeholder=""
                />
            </div>
            <div className="box-border mb-6">
                <Input
                label="amount"
                labelName="Cantidad de cupones"
                type="number"
                nameid="amount"
                onChange={handleInputChange}
                value={couponGenerateData.amount.toString()}
                required={true}
                validKey={NumberInputValidKeys}
                icon={<RiCoupon2Line className="text-black"/>}
                readonly={AmountInputReadonly}
                />
            </div>
            <div className="box-border mb-6">
                <InputBtn
                value={couponGenerateData.discount.toString()}
                titleBtn={["15","20","30","45"]}
                symbol="%"
                nameid="discount"
                onChange={handleInputChange}
                label="discount"
                labelName="Descuento"
                required={true}
                validKey={NumberInputValidKeys}
                icon={<AiOutlinePercentage className="text-black"/>}
                />
            </div>
        </div>
    );
};

export default FirstGroupFields;