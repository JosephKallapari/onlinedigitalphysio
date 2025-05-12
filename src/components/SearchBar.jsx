import React,{useState} from "react";

function SearchBar({onSearch}){
    const [patientId,setPatientId]=useState('');

    const handleSearch=(e)=>{
        e.preventDefault();
        if (patientId){
            onSearch(patientId);
        }    
};

return(
    <form onSubmit={handleSearch} className="search-bar">
        <input
        type="text"
        placeholder="Enter Patient Id"
        value={patientId}
        onChange={(e)=>setPatientId(e.target.value)}
        className="search-input"
        />
        <button type="submit" className="search-button">Search</button>                            
    </form>
);
}

export default SearchBar;