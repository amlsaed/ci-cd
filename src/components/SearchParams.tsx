import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import useBreedList from '../hooks/useBreedList';
import Pet from './Pet';

interface PetInterface {
  id: number;
  name: string;
  animal: string;
  breed: string;
}

const ANIMALS: string[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

const SearchParams = () => {
  const [location, setLocation] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [breed, setBreed] = useState<string>('');
  const [pets, setPets] = useState<PetInterface[]>([]);

  const breeds = useBreedList(animal);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleAnimalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAnimal(e.target.value);
    setBreed('');
  };

  const handleBreedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  const fetchPets = async () => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  };

  useEffect(() => {
    fetchPets();
  }, []); 

  return (
    <div className="search-params">
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          fetchPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={handleLocationChange}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={handleAnimalChange}>
            <option />
            {ANIMALS.map((animalOption) => (
              <option value={animalOption} key={animalOption}>
                {animalOption}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={handleBreedChange}
          >
            <option />
            {breeds.map((breedOption) => (
              <option key={breedOption} value={breedOption}>
                {breedOption}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <div className="search">
        {!pets.length ? (
          <h1>No Pets Found</h1>
        ) : (
          pets.map((pet) => (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchParams;
