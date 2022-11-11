import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '../../assets/icons/SearchIcon';
import PokemonLogo from '../../assets/pokemon.png';
import Padding from '../shared/Padding';

const Navbar:React.FC = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchPokemonOnChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        searchParams.set("name", e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <nav className='flex h-[60px] 
            lg:h-[80px]'>
                <div className={`flex-1 flex items-center ${pathname !== '/' && 'bg-green-primary'}`}>
                    <Padding className="flex-1">
                        <img src={PokemonLogo} onClick={() => navigate("/")}
                            className='h-8 cursor-pointer
                            md:h-12
                            lg:h-14' />
                    </Padding>
                </div>
                
                <div className={`hidden flex-1 bg-green-primary
                    lg:flex`}>
                    {pathname === '/pokemons' && <Padding className="flex justify-end items-center w-full ">
                        <form className='flex bg-white rounded-lg justify-center items-center overflow-hidden px-2 py-1 ring-2 ring-blue-700'
                            onSubmit={(e) => e.preventDefault()}>
                            <input 
                                className='px-2 focus:outline-green-primary mr-1'
                                value={searchParams.get("name") as string}
                                onChange={handleSearchPokemonOnChange}/>
                            <SearchIcon />
                        </form>
                    </Padding>}
                </div>
        </nav>
    );
}

export default Navbar;