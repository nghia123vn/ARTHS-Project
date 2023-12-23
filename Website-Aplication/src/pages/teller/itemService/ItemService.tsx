import { itemService } from "@/types/actions/listService";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";

type Props = {
    _name: string,
    _priceCurrent: number,
    _imageUrl: string,
    _discount: number,
    profileItem: itemService<string, number>,
    onClickAdd: () => void,
    onClickItemDetail: () => void,
    setShowDetail: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemService = ({ _name, _priceCurrent, _imageUrl, onClickAdd, _discount,setShowDetail,onClickItemDetail }: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className=" bg-white drop-shadow-xl p-2 rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='w-full h-[200px] bg-cover relative' style={{ backgroundImage: `url(${_imageUrl})` }}>
                {_discount > 0 && (
                    <div className="absolute top-0 right-0 ">
                        <p className="p-1 text-center bg-red-600 text-white">-{_discount}%</p>
                    </div>
                )}
                {isHovered &&
                    <button className='w-full absolute bottom-0 h-[30px] bg-main text-white'
                        onClick={onClickAdd}
                    >Thêm</button>}
            </div>
            <div className='w-full flex flex-col justify-center items-center space-y-1 pt-1'>
                <p className='text-[14px] text-center'>{_name}</p>
                {_discount > 0 ? (
                    <div className="text-[18px]">
                        <p className='line-through text-[#888888]'>{formatPrice(_priceCurrent)} đ</p>
                        <p className='text-[#FE3A30]'>{formatPrice(_priceCurrent * (1 - _discount / 100))} đ</p>
                    </div>
                ) : (
                    <p className='text-[#FE3A30] text-[18px]'>{formatPrice(_priceCurrent)} đ</p>
                )}
                <div className="flex items-end">
                    <button className="underline underline-offset-4 text-[15px] text-[#FE3A30] hover:text-main"
                        onClick={() => {
                            setShowDetail(true);
                            onClickItemDetail();
                        }}
                    >Chi tiết</button>
                </div>
            </div>
        </div>
    )
}

export default ItemService