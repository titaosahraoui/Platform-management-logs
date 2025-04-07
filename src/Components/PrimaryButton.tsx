
import Spinner from './Spinner';

interface IPrimaryButtonProps {
    icon?: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: (e: any) => void;
    text: string;
    bgColor?: string;
    txtStyle?: string;
    disable?: boolean
    isLoading?: boolean
    width?: string
    type?: "submit" | "button" | "reset"
    height?: string
}

const PrimaryButton: React.FC<IPrimaryButtonProps> = ({ type, text, isLoading, icon, txtStyle, bgColor, disable, width, height, onClick }) => {
    return (
        <>
            <button
                type={type ? type : "button"}
                disabled={disable || isLoading}
                className={`${width ? `w-${width}` : "w-fit"} h-${height} ${disable && "pointer-events-none"} disabled:opacity-60 font-bold group rounded-lg shadow-md text-sm flex justify-center items-center gap-x-2 px-3 py-2 lg:px-4 outline-none hover:rounded-sm  ${txtStyle ? `${txtStyle}` : "text-white"}  ${bgColor ? `${bgColor}` : "bg-primaryColor"} hover:brightness-105 duration-150`}
                onClick={onClick}
            >
                {isLoading ? <Spinner /> : <>{icon && icon} {text} </>}

            </button>
        </>
    );
};

export default PrimaryButton;