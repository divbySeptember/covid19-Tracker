import React, {useState, useEffect} from 'react';
import {MenuItem, FormControl, Select} from "@material-ui/core";
import './form.css'

const Form = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('Worldwide');


    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://api.covid19api.com/countries')
            .then((response) => response.json())
            .then((data) => {
                const countries =data.map((country) => ({
                    name: country.Country,
                    value: country.ISO2,
                    slug: country.Slug
                }));
                setCountries(countries);
                console.log(countries);
            });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        console.log("The abrv ==>>", countryCode);

        setCountry(countryCode);
        
    }

    const newWorld = () => {
        if (country == "Worldwide") {
            return 'W'
        } else {
            return(country)
        }
    };




    return (
        <div className="subbar">

            <h2>{newWorld()}</h2>

            <FormControl className="formApp">
                <Select variant="outlined" 
                onChange={onCountryChange}
                value={country}>
                    <MenuItem value="Worldwide">Worldwide</MenuItem>

                    {countries.map((country) => (
                        <MenuItem value={country.value} key={country.slug}>{country.name}</MenuItem>
                    ))}

                </Select>

            </FormControl>
            
        </div>
    )
}


export default Form;
