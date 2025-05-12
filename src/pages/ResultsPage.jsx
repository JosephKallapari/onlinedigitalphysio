import React ,{useState,useEffect} from "react";
import SearchBar from "../components/SearchBar";

function ResultsPage(){
   const[results,setResults]=useState([]);
   const[patientId,setPatientId]=useState(null);

   useEffect(()=>{
    if (patientId){
        fetch(`http://localhost:5054/Physio/physiosessionresults/${patientId}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error(`Http Error:'${response.status}`);
            }
            return response.text();
        })
        .then((text)=>{
            if(text){
                setResults(JSON.parse(text));
            }else{
                setResults([]);
            }
        })
        .catch((error)=>console.error('Error fetching results:',error));
    }
},[patientId]);

const fetchResults=(patientId)=>{
    setPatientId(patientId);
}

return(
    <div>
        <h1>Results Page</h1>
        <p>Review session results</p>

        <SearchBar onSearch={fetchResults}/>
        <ul>
            {results.map((result,index)=>(
                <li key={index} className="result-item">
                    <p><strong>Patient ID:</strong>{result.patientId}</p>
                                        <p><strong>Date:</strong>{result.date}</p>
                                                            <p><strong>Date:</strong>{result.date}</p>
                    <p><strong>Duration (minutes):</strong>{result.durationMinutes}</p>
                    <ul>
                        {result.exercises.map((exercise,i)=>(
                            <li key={i}>
                                                    <p><strong>ExerciseName:</strong>{exercise.exerciseName}</p>
                                                    <p><strong>Repetitions:</strong>{exercise.repetitions}</p>
                                                    <p><strong>Sets:</strong>{exercise.sets}</p>
                            </li>
                        ))}
                    </ul>
                                        <p><strong>Missed Exercise:</strong>{result.missedExercises.join(',')}</p>
                                        <p><strong>Consistency Score:</strong>{result.consistencyScore}</p>
<p><strong>Calories Burned:</strong>{result.caloriesBurned}</p>




                </li>
            ))}
        </ul>
    </div>
);
   
}

export default ResultsPage;