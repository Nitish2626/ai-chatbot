import { Link } from "react-router-dom";

type Props={
    to:string;
    text:string;
    click?:()=>void;
};

const NavigationLink = ({to,text,click}:Props) => {
    return (
        <Link to={to} className={`text-white hover:text-gray-400 text-xl`} onClick={click}>
            {text}
        </Link>
    );
}

export default NavigationLink;