import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
    dataValue:string;
    handleDescription:(value: string) => void
}

const Description = ({dataValue,handleDescription}: Props) => {
    return (
        <div className="bg-white p-3 space-y-3">
            <div className="flex space-x-2">
            <p className="pl-1 text-[22px] font-semibold">Mô tả</p>
            <p className="text-red-800">*</p>
            </div>
            <div className='w-full h-[320px]'>
                <ReactQuill
                value={dataValue} 
                onChange={handleDescription}
                style={{ height: '280px',}}
                />
            </div>
        </div>
    )
}

export default Description