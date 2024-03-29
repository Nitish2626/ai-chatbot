type Props={
    type:string;
    name:string;
    label:string;
    val:React.RefObject<HTMLInputElement>;
};

const CustomizedInput = ({type,name,label,val}:Props) => {
    return (
        <>
            <label className="text-white text-lg">
                {label}
            </label>
            <input type={type} name={name} ref={val} className="w-88 py-1 px-2 text-xl border-none rounded-lg mb-4"></input>
        </>
    );
}

export default CustomizedInput;