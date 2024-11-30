import { useState, useEffect } from 'react';

const useEducation = (initialEducationList = []) => {
  const [educationList, setEducationList] = useState([]);

  // Only reset `educationList` when `initialEducationList` changes
//   useEffect(() => {
//     console.log("Updating education list:", initialEducationList);
//     setEducationList(initialEducationList);
//   }, [initialEducationList]);
useEffect(() => {
    if (JSON.stringify(initialEducationList) !== JSON.stringify(educationList)) {
      console.log("Updating education list:", initialEducationList);
      setEducationList(initialEducationList);
    }
  }, [initialEducationList]);
  
  


  const [educationForm, setEducationForm] = useState({
    educationType: '',
    percentage: '',
    year: '',
    schoolName: '',
  });

  const [error, setError] = useState('');

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleAddEducation = () => {
    const { educationType, percentage, year, schoolName } = educationForm;

    if (!educationType || !percentage || !year || !schoolName) {
      setError('All fields are required');
      return;
    }

    const parsedPercentage = parseFloat(percentage);
    if (isNaN(parsedPercentage) || parsedPercentage < 0 || parsedPercentage > 100) {
      setError('Percentage must be a valid number between 0 and 100');
      return;
    }

    const currentYear = new Date().getFullYear();
    if (!/^\d{4}$/.test(year) || year < 1900 || year > currentYear) {
      setError(`Year must be a valid year between 1900 and ${currentYear}`);
      return;
    }
    const newEducation = {
        // id: uuidv4(), // Unique ID
        educationType,
        percentage,
        year,
        schoolName,
      };

    setError('');
    setEducationList((prevList) => [
      ...prevList,
     newEducation,
    ]);
    setEducationForm({ educationType: '', percentage: '', year: '', schoolName: '' });
  };

  const handleRemoveEducation = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  const handleUpdateEducation = (index, updatedEducation) => {
    setEducationList((prevList) =>
      prevList.map((item, i) => (i === index ? { ...item, ...updatedEducation } : item))
    );
  };
  

  return {
    educationList,
    educationForm,
    error,
    handleEducationChange,
    handleAddEducation,
    handleRemoveEducation,
    setEducationForm,
  };
};

export default useEducation;
