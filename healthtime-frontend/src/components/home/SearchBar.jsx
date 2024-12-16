import React, { useState, useEffect } from 'react';
import { RiUserSearchLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import Select from 'react-select';
import axios from 'axios';
import doctor from '../../assets/soignant.png';

const SearchBar = ({ mode, specialiteId, villeId }) => {
    const back = import.meta.env.VITE_BACK_URL;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ specialites: [], soignants: [] });
    const [villes, setVilles] = useState([]);
    const [selectedVille, setSelectedVille] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Fetch cities
    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await axios.get(`${back}/villes`);
                const options = response.data.map((ville) => ({
                    value: ville.id,
                    label: ville.nom,
                }));
                setVilles(options);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };
        fetchVilles();
    }, [back]);

    useEffect(() => {
        const fetchSpecialite = async () => {
            if (specialiteId) {
                try {
                    const response = await axios.get(`${back}/specialites/${specialiteId}`);
                    setQuery(response.data.nom);
                    setResults((prevResults) => ({
                        ...prevResults,
                        specialites: [...prevResults.specialites, { id: specialiteId, nom: response.data.nom }]
                    }));
                } catch (error) {
                    console.error("Error fetching speciality:", error);
                }
            }
        };

        if (villeId && villes.length > 0) {
            const ville = villes.find((ville) => ville.value === Number(villeId));
            console.log(villeId);
            
            if (ville) {
                setSelectedVille(ville);
            }
        }

        fetchSpecialite();
    }, [specialiteId, villeId, villes]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                const response = await axios.get(
                    `${back}/soignants/search?prefix=${value}&limit=10`
                );
                setResults(response.data);
                setIsDropdownVisible(true);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setIsDropdownVisible(false);
        }
    };

    const handleSpecialiteClick = (specialite) => {
        setQuery(specialite.nom);
        setIsDropdownVisible(false);
    };

    const handleSoignantClick = (soignant) => {
        window.location.href = `/search/soignants/${soignant.id}`;
    };

    const handleSearch = () => {
        const specialite = results.specialites.find((s) => s.nom === query);
        if (specialite) {
            const route = selectedVille
                ? `/search/specialites/${specialite.id}/${selectedVille.value}`
                : `/search/specialites/${specialite.id}/0`;
            window.location.href = route;
        } else {
            alert("Veuillez sélectionner une spécialité valide.");
        }
    };

    return (
        <div className={`${mode === "home" && 'absolute'} bottom-14 left-10 flex flex-col w-3/5 bg-white p-4 rounded-md gap-1 shadow-sm`}>
            <p className='text-sky-900 font-semibold text-sm'>Qui cherchez-vous?</p>
            <div className='flex w-full bg-gray-200 rounded p-1 text-sm relative'>
                {/* Input with Dropdown */}
                <span className='w-2/5 flex items-center px-2 border-r border-r-gray-400 rounded-l-2xl relative'>
                    <RiUserSearchLine size={18} className='text-gray-700' />
                    <input
                        type='text'
                        placeholder='Nom, spécialité'
                        value={query}
                        onChange={handleInputChange}
                        className='border-0 focus:ring-0 text-gray-700 w-full bg-gray-200 text-sm'
                    />
                    {isDropdownVisible && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-md z-50">
                            {results.specialites.map((specialite) => (
                                <div
                                    key={specialite.id}
                                    className="px-3 py-2 cursor-pointer hover:bg-sky-100"
                                    onClick={() => handleSpecialiteClick(specialite)}
                                >
                                    {specialite.nom}
                                </div>
                            ))}
                            {results.soignants.map((soignant) => (
                                <div
                                    key={soignant.id}
                                    className="flex px-3 py-2 cursor-pointer hover:bg-sky-100 gap-2"
                                    onClick={() => handleSoignantClick(soignant)}
                                >
                                    <img src={doctor} className='w-10 h-10 ' alt="Doctor" />
                                    <span>
                                        <p>Dr {soignant.nom + " " + soignant.prenom}</p>
                                        <p className='text-xs text-zinc-500'>{soignant.nomVille}</p>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </span>

                {/* Location Input with React Select */}
                <span className='w-2/5 flex items-center px-2 border-r relative'>
                    <IoLocationOutline size={18} className='text-gray-700' />
                    <Select
                        options={villes}
                        value={selectedVille}
                        onChange={(option) => setSelectedVille(option)}
                        placeholder="Ville"
                        className="w-full text-sm"
                        isClearable
                        styles={{
                            control: (base) => ({ ...base, border: 0, boxShadow: 'none', backgroundColor: 'transparent' }),
                            placeholder: (base) => ({ ...base, color: '#4A5568' }),
                        }}
                    />
                </span>

                {/* Search Button */}
                <button
                    className='w-1/5 bg-white rounded-r-full text-sky-900 hover:bg-white/90 duration-300 text-sm'
                    onClick={handleSearch}
                >
                    Chercher
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
