import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

type Props = {
    place: string,
    setAddSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchFilterAccount = ({ place, setAddSearch }: Props) => {
    const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
    return (
        <form className="w-[70%]">
            <div className="w-full relative">
                <input
                    type="text"
                    placeholder={place}
                    className="w-full py-3 pl-3 pr-4 rounded-md outline-none border-2 border-gray-300 bg-white focus:border-gray-700"
                    onChange={(e) => {
                        if (searchTimeout) {
                            clearTimeout(searchTimeout);
                        }
                        const newTimeSearch = window.setTimeout(() => {
                            setAddSearch(e.target.value);
                        }, 800);

                        // Cập nhật trạng thái searchTimeout
                        setSearchTimeout(newTimeSearch);
                    }}

                />
                <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-0 bottom-0 my-auto stroke-gray-500" />
            </div>
        </form>
    )
}

export default SearchFilterAccount