import React,{useState} from "react";

function PrescriptionPage(){
    const[formData,setFormData]=useState({
        id:0,
        patientId:'',
        age:0,
        condition:'',
        prescribedExercises:[
            {
                exercise:'',
                description:'',
                repetitions:0,
                sets:0,
            },
        ],
    });

    const[successMessage,setSuccessMessage]=useState('');

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData({...formData,[name]:value});
    };

    const handleExerciseChange=(index,e)=>{
        const{name,value}=e.target;
        const updatedExercises=[...formData.prescribedExercises];
        updatedExercises[index][name]=value;
        setFormData({...formData,prescribedExercises:updatedExercises});
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch('http://localhost:5054/Physio/prescribe',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Accept:'*/*'
            },
            body:JSON.stringify(formData),
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log('Success:',data);
            setSuccessMessage('Prescription submitted successfully');
        })
        .catch((error)=>console.error('Error:',error));
    };

    return(
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Prescription Page</h1>
                {successMessage &&(
                    <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
                        {successMessage}
                     </div>   
                )}
                <form onSubmit={handleSubmit} className="space y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            PatientId:
                            <input type="number" name="patientId" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={formData.patientId}
                            onChange={handleChange}
                            />
                        </label>                        
                    </div>
                    <br></br>
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Age:
                            <input type="number" name="age" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={formData.age}
                            onChange={handleChange}
                            />
                        </label>                        
                    </div>
                    <br></br>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Condition:
                            <input type="text" name="condition" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={formData.condition}
                            onChange={handleChange}
                            />
                        </label>                        
                    </div>
                    <br></br>
                    <h2 className="text-lg font-semibold text-gray-800 mt-6 border-pt-4">Prescribed Exercises</h2>
                    {formData.prescribedExercises.map((exercise,index)=>(
                        <div key={index}>
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Exercise:
                            <input type="text" name="exercise" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={exercise.exercise}
                            onChange={(e)=>handleExerciseChange(index,e)}
                            />
                        </label>                        
                    </div>
                    <br></br>
                         <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description:
                            <input type="text" name="description" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={exercise.description}
                            onChange={(e)=>handleExerciseChange(index,e)}
                            />
                        </label>                        
                    </div>
                    <br></br>
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Repetitions:
                            <input type="number" name="repetitions" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={exercise.repetitions}
                            onChange={(e)=>handleExerciseChange(index,e)}
                            />
                        </label>                        
                    </div>
                    <br></br>
                                            <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sets:
                            <input type="number" name="sets" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                            value={exercise.sets}
                            onChange={(e)=>handleExerciseChange(index,e)}
                            />
                        </label>                        
                    </div>
                    <br></br>


                        </div>
                    ))}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Prescribe</button>
 
                </form>
            </div>
        </div>
    )
}

export default PrescriptionPage;