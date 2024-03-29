import { FaLongArrowAltRight } from "react-icons/fa";
import Logo from '../assets/Logo.svg';
import './Home.scss';


export default function () {

    return (

        <div className='home-container'>

                <img src={Logo} alt="Ethereal" />
                <h2 className='title'>Your spiritual Experiences</h2>

                <div>
                    <a href="/events"><button className='button-home'>Go to Events<FaLongArrowAltRight size={20} className='fa-arrow-right' /></button></a>
                </div>

        </div>

    );

}
