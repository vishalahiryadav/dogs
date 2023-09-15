import React, {useEffect, useState } from "react"
import PetCard from "../component/PetCard"
import PetFilter from "../component/PetFilter";
import PetSort from "../component/PetSort";
import SetMetaData from "../CustomHooks/SetMetaData";

function AllPets({pets,selectedCategory}){ 
    const [SelectedCategory, setSelectedCategory]=useState("all")
    const [selectedCity,setSelectedCity]=useState("");
    const[visiblePets,setVisiblePets]=useState([]);
    const [selectedSortOption,setSelectedSortOption]=useState("Relavence")
     SetMetaData("description",
     "Browse through our collection of adoptable pets, including dogs, cats, rabbits, and more. Find your ideal pet and make a positive impact by choosing adoption",
     "Browse Pets For Adoption |Dogs, Cats, And Other Animals  | Poodles Pet Adoption",
     );

  const customRelavenceSort = (pets)=>{
    return pets.map((pet)=>{
      let RelavenceSore = 0;
      switch(pet.age){
        case "Puppy":
          RelavenceSore +=5;
          break;
          case "Young":
            RelavenceSore +=4;
            break;
            case "Adult":
              RelavenceSore +=3;
              break;
              case "Senior":
                RelavenceSore +=2;
                break;
                default:
                  RelavenceSore +=1;
      }
      return {...pet,RelavenceSore}
    })
  }
    function handleCategoryChange(category){
      setSelectedCategory(category.toLowerCase()); 
     }
     function handleCityChange(event){
      setSelectedCity(event.target.value)
     }
    function handleSortChange(event){
      setSelectedSortOption(event.target.value)
    }

    useEffect(() => {
      // Update the local state SelectedCategory when the prop selectedCategory changes
      setSelectedCategory(selectedCategory.toLowerCase());
    }, [selectedCategory]);

     useEffect(()=>{
      const filteredPets = pets && pets.filter((pet) => {
        const categoryMatch =
          SelectedCategory === "" || SelectedCategory === "all" || pet.category === SelectedCategory;
      const cityMatch = selectedCity === "" || pet.city.toLowerCase().includes(selectedCity.toLowerCase())
        return categoryMatch && cityMatch;
      });
      let sortedPets = [];

      if (Array.isArray(filteredPets)) {
        sortedPets = [...filteredPets];
      }
     if (selectedSortOption === "Newest") {
      sortedPets.sort((a, b) => b.createdAt - a.createdAt);
    } else if (selectedSortOption === "Oldest") {
      sortedPets.sort((a, b) => a.createdAt - b.createdAt);
    }else if(selectedSortOption === "Relavence"){
      sortedPets = customRelavenceSort(sortedPets);
      sortedPets.sort((a, b) => b.RelavenceSore - a.RelavenceSore);
    }
      setVisiblePets(sortedPets);
     },[SelectedCategory, selectedCity,pets,selectedSortOption])
      return(
      <div className="container-fluid AllPets">
           <div className="row filter_sort_container">
            <div className="col col-md-6 allpets_pet_filter_container" style={{textAlign:"end"}}>
            <PetFilter  selectedCategory ={selectedCategory} categoryoptions={["Dog", "Cat", "Bird","Other"]}  onCategoryChange={handleCategoryChange} onCityChange={handleCityChange}/>
            </div>
            <div className="col col-md-6 allpets_pet_sort_container">
            <PetSort options={["Relavence","Newest","Oldest"]} onSortChange={handleSortChange}/>
            </div>
           </div>
          <div className="row allpets_container" >
  
            {visiblePets && visiblePets.map((pet)=>{
               const {petId,petname,files}=pet;
               const images = Object.values(files)
               const profileImage = images[0].__filePath;
               return(
                <PetCard
                  key={petId}
                  petId={petId}
                  name={petname}
                  profilepic={profileImage}
                />
              )
            })}
      </div>
      </div>
      )
  }
  

export default AllPets;