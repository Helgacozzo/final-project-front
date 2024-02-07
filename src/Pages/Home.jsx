import './Home.scss';
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {

    return (

        <div className='container'>

            <h2 className='title'>Your spiritual <br /> Experiences</h2>
            <hr />
            <a href="/events"><button className='button-home'>Go to Events <div className='fa-arrow-right'><FaLongArrowAltRight /></div></button></a>

        </div>

    );

}
