import { resetError } from '@/actions/userInfor';
import { useDispatch } from 'react-redux';
import LoadingCreateUpdate from '../LoadingCreateUpdate';

type Props = {
    onClose: () => void;
    isVisible: boolean;
    isLoading:boolean,
    showCheckError:string|null
    showError:string
    setShowError:React.Dispatch<React.SetStateAction<string>>,
    addNote:string,
    setAddNote:React.Dispatch<React.SetStateAction<string>>,
    addContent:string, 
    setAddContent:React.Dispatch<React.SetStateAction<string>>,
    addWeight:number,
    setAddWeight:React.Dispatch<React.SetStateAction<number>>,
    addLength:number,
    setAddLength:React.Dispatch<React.SetStateAction<number>>,
    addWidth:number,
    setAddWidth:React.Dispatch<React.SetStateAction<number>>,
    addHeight:number,
    setAddHeight:React.Dispatch<React.SetStateAction<number>>,
    handleCreateTransport:()=>void,

}

const CreateTransport = ({ isVisible, onClose,isLoading,showCheckError,showError,setShowError,
    setAddNote,setAddContent,setAddLength,setAddWidth,setAddWeight,setAddHeight,handleCreateTransport,
    addWeight,addHeight,addWidth,addLength,

}: Props) => {
    const dispatch = useDispatch();
    if (!isVisible) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="min-w-[500px] bg-white rounded-lg pb-3">
                <div className="bg-gray-600 py-2 rounded-t-lg">
                    <div className="w-full flex flex-row justify-between py-[5px] text-white ">
                        <p className="ml-2 mt-1 font-bold">
                            Thông tin đơn hàng vận chuyển
                        </p>
                    </div>
                </div>
                <div className='py-5 px-3 space-y-3'>
                    <div className='flex space-x-3 items-center'>
                        <p className="text-[17px] font-semibold">Nội dung:</p>
                        <input type="text"
                            className='outline-none w-[80%] px-1 border-b-2 border-gray-500'
                            placeholder='Nhập nội dung'
                            onChange={(e) => setAddNote(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col w-full space-y-1'>
                        <p className="text-[17px] font-semibold">Ghi chú:</p>
                        <textarea
                            className='w-full min-h-[130px] py-1 px-2 border-2 border-gray-500 rounded-lg'
                            placeholder='Nhập ghi chú...'
                            onChange={(e) => setAddContent(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='grid grid-cols-2 justify-items-center gap-3 '>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Cân nặng(g):</p>
                            <input type="number"
                                className='w-[80px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={addWeight}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if(newValue >0 && newValue<=1000000){
                                        setAddWeight(newValue);
                                    }else{
                                        if(newValue<0){
                                            setAddWeight(1)
                                        }
                                        if(newValue>1000000){
                                            setAddWeight(1000000)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Chiều dài(cm):</p>
                            <input type="number"
                                className='w-[60px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={addLength}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if(newValue >0 && newValue<=1000){
                                        setAddLength(newValue);
                                    }else{
                                        if(newValue<0){
                                            setAddLength(1)
                                        }
                                        if(newValue>1000){
                                            setAddLength(1000)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Chiều rộng(cm):</p>
                            <input type="number"
                                className='w-[60px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={addWidth}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if(newValue >0 && newValue<=1000){
                                        setAddWidth(newValue);
                                    }else{
                                        if(newValue<0){
                                            setAddWidth(1)
                                        }
                                        if(newValue>1000){
                                            setAddWidth(1000)
                                        }
                                    }
                                }}
                            />
                        </div>
                        <div className='flex items-center space-x-3 pt-3 font-semibold '>
                            <p className='text-[17px]'>Chiều cao(cm):</p>
                            <input type="number"
                                className='w-[60px] outline-none border-b-2 border-gray-600 text-center text-[15px]'
                                min={1}
                                value={addHeight}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if(newValue >0 && newValue<=1000){
                                        setAddHeight(newValue);
                                    }else{
                                        if(newValue<0){
                                            setAddHeight(1)
                                        }
                                        if(newValue>1000){
                                            setAddHeight(1000)
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {showError ? (
                        <p className='text-red-700 text-center text-[18px] font-semibold pt-3'>{showError}</p>
                    ) : ""}
                </div>
                {showCheckError !== null ? <p className="text-red-800 text-center">Đã có lỗi, hãy kiểm tra lại thông tin đơn hàng</p> : ""}

                <div className="font-bold text-white flex flex-row-reverse justify-center space-x-5 space-x-reverse pt-[10px]">

                    <button
                        type='button'
                        className={`hover:bg-blue-800 bg-gray-400 px-5 h-[40px]  rounded-md`}
                        onClick={handleCreateTransport}
                    >
                        Chuyển đơn vận chuyển
                    </button>
                    <button
                        className=" bg-red-700 px-5 h-[40px]  rounded-md  "
                        onClick={() => {
                            onClose();
                            setShowError('');
                            dispatch(resetError());
                        }}
                    >
                        Hủy
                    </button>
                </div>
            </div>
            {isLoading ? <LoadingCreateUpdate /> : ""}
        </div>
    )
}

export default CreateTransport