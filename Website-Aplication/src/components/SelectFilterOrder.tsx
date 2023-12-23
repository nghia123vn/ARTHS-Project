import React from 'react'

type Props = {
    setChooseSelect: React.Dispatch<React.SetStateAction<string>>;
    setAddSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SelectFilterOrder = ({ setChooseSelect, setAddSearch }: Props) => {
    return (
            <select className='px-2 outline-none rounded-lg'
                onChange={(e) => {
                    setChooseSelect(e.target.value)
                    setAddSearch("");
                }}
            >
                <option value="name">Tên khách hàng</option>
                <option value="sdt">Số điện thoại</option>
            </select>
    )
}

export default SelectFilterOrder