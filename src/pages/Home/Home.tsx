import { useNavigate } from 'react-router-dom';
import Charizard from '../../assets/charizard.png';
import Margin from "../../components/shared/Margin";

const Home:React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-[calc(100vh-60px)]">

            <div className="flex flex-1">
                <Margin className="flex flex-col items-center justify-center pb-[60px]">
                    <h1 className="font-bold text-2xl mb-4
                        md:text-4xl md:mb-8">
                        Who's That Pokemon?
                    </h1>
                    <p className="text-center mb-8
                        md:text-lg md:mb-12">
                        Do you have what it takes to be the next Pokemon Master? Let's put your skills to test! Identify as many pokemons as you can.
                    </p>
                    <div>
                        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm mr-2
                            md:text-lg md:mr-6" onClick={() => navigate('/game')}>Play Game</button>
                        <button className="px-4 py-2 bg-black text-white rounded-xl text-sm
                            md:text-lg" onClick={() => navigate('/pokemons?type=&name=')}>Pokemons</button>
                    </div>
                </Margin>
            </div>

            <div className="flex-1 bg-green-primary items-center justify-center hidden
                 lg:flex">
                <div className="p-32 relative">
                    <img className="z-50 animate-bounce" alt="Charizard" 
                        src={Charizard} />
                </div>
            </div>
        </div>
    );    
}

export default Home;