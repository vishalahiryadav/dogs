import React from "react";
function PetSort({options,onSortChange}){
    return(
        <div className="pets-sort-container">
        <lable className="pet_sort_label" htmlFor="sort">Sort By:</lable>
        <select className="pet_select_sort" id="sort" onChange={onSortChange}>
            {options.map((option)=>(
                  <option key={option} value={option}>
                  {option}
                </option>
            ))}
        </select>
    </div>
    )
}
export default PetSort;
