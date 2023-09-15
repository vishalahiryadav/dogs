import React, { useEffect } from "react";
import SetMetaData from "../CustomHooks/SetMetaData";
function FrequentlyAskedQuestion(){
   SetMetaData(
      "description",
      "Explore frequently asked questions about pet adoption. Learn about our adoption process, the types of pets available, reasons to consider adoption, and how you can support even if you can't adopt.",
      "General Questions About Pet Adoption - Poodles Pet Adoption Platform",
   );
    return(<div className="frequently_asked_questions_container">
        <div className="frequently_asked_questions_inner_container">

         <h2 className="frequently_asked_questions_page_heading">Generally Asked Questions</h2>
        <div className="frequently_asked_questions_question_container">
         <h3>Do We Sell Pets?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>No, we do not sell pets, we only Promote Responsible Pet Adoption.</p>
         </div>

         <div className="frequently_asked_questions_question_container">
         <h3>Do We Sell Pets?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>You can support  by volunteering, donating supplies, contributing funds, or promoting  adoptable pets on social media.</p>
         </div>

        <div className="frequently_asked_questions_question_container">
         <h3>What is pet adoption?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>Pet adoption is the process of providing a loving and forever home to a shelter animal or a pet in need, 
            rather than purchasing one from a breeder or pet store.</p>
         </div>
          
         <div className="frequently_asked_questions_question_container">
         <h3>Why should I consider adopting a pet?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>Adopting a pet not only saves a life but also promotes responsible pet ownership. Shelter animals are often 
            loving companions and come in a variety of breeds and sizes.</p>
         </div>

         <div className="frequently_asked_questions_question_container">
         <h3>What types of pets are available for adoption?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>Animal shelters and rescue organizations offer a wide range of pets for adoption, including dogs, 
            cats, rabbits, guinea pigs, birds, and more.</p>
         </div>

         <div className="frequently_asked_questions_question_container">
         <h3>How does the pet adoption process work?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>The adoption process begins with discovering a pet on our platform that resonates with you. After filling out an adoption form, you can bring your new companion 
            home and embark on a journey of companionship.</p>
         </div>

         <div className="frequently_asked_questions_question_container">
         <h3>Are shelter pets trained?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>Some shelter pets may have basic training, while others may require more. However, most shelters offer resources and advice for training and behavior.</p>
         </div>

         <div className="frequently_asked_questions_question_container">
         <h3>How do I prepare for a new pet at home?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>Prepare your home with pet essentials like food, water bowls, a bed, toys, and a safe space. Research the pet's needs and consult the shelter staff for advice.</p>
         </div>

         <div className="frequently_asked_questions_question_container">
         <h3>How can I support even if I can't adopt?</h3>
         </div>
         <div className="frequently_asked_questions_answer_container">
         <p>You can support  by volunteering, donating supplies, contributing funds, or promoting  adoptable pets on social media.</p>
         </div>

         <p >Incase If You Still Have Some Questions In Mind Feel Free To Reach Us At <strong>contact@poodles.in</strong></p>
          <a href="/allpets">Explore Pets Near You For Adoption!</a>
        </div>
    </div>);
}
export default FrequentlyAskedQuestion;