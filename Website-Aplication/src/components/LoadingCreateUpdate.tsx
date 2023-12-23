import { FadeLoader } from "react-spinners"

const LoadingCreateUpdate = () => {
    return (
        <div className="h-screen fixed z-10 inset-0 bg-black bg-opacity-10 backdrop-blur-sm">
            <div className="h-[93vh] flex justify-center items-center">
            <FadeLoader
                color="#BD3505"
                height={50}
                margin={25}
                speedMultiplier={2}
                width={5}
            />
            </div>
        </div>
    )
}

export default LoadingCreateUpdate