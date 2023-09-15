import React, { useEffect } from "react";
import SetMetaData  from "../CustomHooks/SetMetaData";
function TermsOfService() {
    SetMetaData("description",
    "Read our Terms of Use to understand the guidelines for using Poodles Pet Adoption. Discover our commitment to responsible pet adoption and the terms that govern your usage.",
    "Terms of Use and Responsible Pet Adoption - Poodles Pet Adoption Platform",
    );
    useEffect(()=>{
  const metaDescription = document.createElement("meta");
  metaDescription.name = "Terms of Use and Responsible Pet Adoption - Poodles Pet Adoption";
  metaDescription.content = "Read our Terms of Use to understand the guidelines for using Poodles Pet Adoption. Discover our commitment to responsible pet adoption and the terms that govern your usage.";
  document.head.appendChild(metaDescription);
  return ()=>{
    document.head.removeChild(metaDescription);
  }
    },[])
    return (
        <div className="container-fluid terms_of_service_container">
            <div className=" terms_of_service_inner_container frequently_asked_questions_inner_container">
                <h1>1. GENERAL</h1>
                <p className="frequently_asked_questions_question_container">This Website ("www.poodles.in")  is owned and operated by Poodles Petcare Private Limited (hereinafter referred to as “Owner” or “Company”) a company incorporated under the Companies Act, 2013 of India,
                    is the sole owner, operator, author and publisher of the Website.

                    We recommend that before using any of the services on Poodles Platform, you must read and agree to these Terms of Use as well as our Privacy Policy.

                    By accessing or using Poodles Petcare in any manner, including, but not limited to, visiting or browsing on Poodles or
                    contributing content or other materials to Poodles, you agree to be bound by these Terms of Use.</p>
                
                <h1>2. ACCEPTANCE OF TERMS AND CONDITIONS</h1>
                <p  className="frequently_asked_questions_question_container">These Terms of Use (hereinafter referred to as "Terms and Conditions" or "T&C" or "Terms" or "Agreement") along with any other Policy or
                    Statement or Information that may be placed on this website (hereinafter referred to as “Poodles Petcare” or “Poodles” or “Website” or “We” or “Us”),
                    as modified or amended from time to time, are a binding contract between the Company and You (hereinafter referred to as "You" or "End User" or "Your"
                    or "Buyer" or "Customer")If you visit, use, or shop at the site or any future site operated by the company, you accept these Terms and Conditions.
                    In addition, when you use any current or future services of the company or visit or purchase from any business affiliated with the company or
                    third-party vendors, whether or not included in the site, you also will be subject to the guidelines and conditions applicable to such service or merchant.
                    If these conditions are inconsistent with such guidelines and conditions, such guidelines and conditions will control.You by subscribing to or using any of
                    our products or services, you agree that you have read, understood and are bound by the Terms and Conditions, regardless of how you subscribe to or use
                    our products or services. If you do not want to be bound by the terms, you must not subscribe to or use our services.</p>
                <h1>3. MODIFICATION</h1>
                <p  className="frequently_asked_questions_question_container">Poodles Petcare  reserves the right to change, modify, adjust, vary, amend or alter all or any of its Terms of Use at any time and at its sole discretion.
                    All such changes, modifications, adjustments, amendments and alterations shall be duly notified by Poodles Petcare however, it is the responsibility of the
                    User to keep himself/herself updated regarding such modifications. Poodles shall in no case be held liable in respect of such modifications. The User agrees
                    to abide by all applicable guidelines, policies, rules, terms and conditions for availing the Services on Poodles Platform, which may change from time to time.</p>
                <h1>4. PROHIBITIONS</h1>
                <p className="frequently_asked_questions_question_container">Poodles Petcare grants you a limited license to access and make personal use of the website and services.</p>
                <p  className="frequently_asked_questions_question_container">The following actions will be considered as misuse of the website, and are thus prohibited:</p>
                <ul>
                    <li  className="frequently_asked_questions_question_container">You are not allowed to reproduce, modify, distribute, display any portion, publish any content or make any commercial use of any of the information provided in this website</li>
                    <li  className="frequently_asked_questions_question_container">You shall not distribute in any form, any information, or other material that violates, infringes the copyrights, patents, trademarks, trade secrets, logo or other proprietary rights of Poodles Petcare.</li>
                    <li  className="frequently_asked_questions_question_container">You are not allowed to republish, archive or retain any content on the internet, intranet, extranet, database, archive or compilation. You are not allowed to use any content for commercial use.</li>
                    <li  className="frequently_asked_questions_question_container">You agree not to decompile, reverse engineer or disassemble any software or other products or processes accessible through the website, and not to insert any code or product or manipulate the content in any way that affects the user's experience.</li>
                    <li  className="frequently_asked_questions_question_container">You are not allowed to use the website in any manner that is illegal or impairs the operation of the website or its availability or usage by others.</li>
                    <li  className="frequently_asked_questions_question_container"> You further agree not to use any data mining, bugs, viruses, worms, trap doors, web crawlers, robots, cancel bots, spiders, Trojan horses, other harmful code of properties or any data gathering or extraction method in connection with your use of the website.</li>
                    <li  className="frequently_asked_questions_question_container">You are not allowed to make any use of the website for the benefit of another business.</li>
                    <li  className="frequently_asked_questions_question_container">You are not allowed to post unsolicited promotional or advertising content.</li>
                    <li  className="frequently_asked_questions_question_container">We hereby hold no liability to any sort of damage or harm caused to your software, data or computer device by downloading content from this website.</li>
                </ul>
                <h1>5. ELIGIBILITY</h1>
                <p  className="frequently_asked_questions_question_container">Use of this website is available only to persons who can form legally binding contracts under Indian Contract Act, 1872. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc. are not eligible to use this Website.</p>
                <p  className="frequently_asked_questions_question_container">The Service is not available to minors under the age of 18 or to any users suspended or removed from the system by Poodles.in for any reason. If you are a minor i.e. under the age of 18 years, you shall not purchase any items on the Website. As a minor if you wish to purchase an item on the Website, such a purchase may be made by your legal guardian or parents.</p>
                <p  className="frequently_asked_questions_question_container">Users may not have more than one account. Maintaining more than one account by a user shall amount to fraudulent act on part of the user and attract
                    actions against such users. Additionally, users are prohibited from selling, trading, or otherwise transferring your Poodles.in account to another party.
                    If you do not qualify, you may not use the Service or the Site.</p>
                <p  className="frequently_asked_questions_question_container">Users may not have more than one account. Maintaining more than one account by a user shall amount to fraudulent act on part of the user and attract actions against such users. Additionally, users are prohibited from selling, trading, or otherwise transferring your Poodles.in account to another party. If you do not qualify, you may not use the Service or the Site.</p>
                <p  className="frequently_asked_questions_question_container">In consideration of your use of the Site, you represent that you are of legal age to form a binding contract and are not a person barred from receiving services under
                    the laws as applicable in India. You also agree to provide true, accurate, current and complete information about yourself as prompted by the Site's
                    registration form. If you provide any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete),
                    or Poodles.in has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, Poodles.in has the right to suspend or terminate
                    your account and refuse any and all current or future use of the Site (or any portion thereof). If you use the Site, you are responsible for maintaining the
                    confidentiality of your account and password including cases when it is being used by any of your family members, friends or relatives, whether a minor or an adult.
                    You further agree to accept responsibility for all transactions made from your account and any dispute arising out of any misuse of your account, whether by any
                    family member, friend, relative, any third party or otherwise shall not be entertained by the Company. Because of this, we strongly recommend that you exit from
                    your account at the end of each session. You agree to notify Poodles.in immediately of any unauthorized use of your account or any other breach of security.
                    Poodles.in reserves the right to refuse service, terminate accounts, or remove or edit content in its sole discretion.</p>
                <p className="frequently_asked_questions_question_container"> If you are a business entity, you represent that you are duly authorised by the business entity to accept these terms and conditions and you have the authority to bind that business entity to these terms and conditions.</p>
                <h1>6. ERRORS, INACCURACIES, AND OMISSIONS</h1>
                <p  className="frequently_asked_questions_question_container"> There may be information on our site that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing,
                    promotions, offers, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions and to change or update
                    information without prior notice (including after you have submitted your order).</p>
                <p  className="frequently_asked_questions_question_container">In the event a product is listed at an incorrect price or with incorrect information due to a typographical error or error in pricing or product information,
                    Poodles Petcare shall have the right to refuse or cancel any orders placed for the product listed at the incorrect price whether or not the order has
                    been confirmed and your credit card charged. If your credit card has already been charged for the purchase and your order is cancelled, Poodles Petcare
                    shall immediately issue credit in the amount of the charge.</p>
                <h1>7. LINKS TO OTHER SITES</h1>
                <p  className="frequently_asked_questions_question_container">This website may contain links to third party websites. Any outside links are provided only as a convenience. Your use of outside links is at
                    your sole risk. Links from the website do not constitute Poodles endorsement of any third party, its website, or its goods or services. Poodles
                    is not responsible for any outside sites, services or other materials linked to or from the website, and disclaims all liability for any injury
                    you may experience by using such materials.</p>
                <h1>8. PRIVACY</h1>
                <p  className="frequently_asked_questions_question_container">Please review our Privacy Policy, which also governs your visit to Poodles.in, to understand our practices. The personal information / data
                    provided to us by you during the course of usage of Poodles.in will be treated as strictly confidential and in accordance with the
                    Privacy Policy and applicable laws and regulations. If you object to your information being transferred or used, please do not use the website.</p>
                <h1>9. ACCOUNT INFORMATION</h1>
                <p  className="frequently_asked_questions_question_container">Poodles Petcare may assign you a password and account for identification, to enable you to access and use certain portions of this website.
                    Each time you use a password or identification, you will be deemed to be authorized to access and use the website in a manner
                    consistent with the terms and conditions of this agreement.</p>
                <p  className="frequently_asked_questions_question_container">Poodles Petcare has no obligation to investigate the authorization or source of any such access or use of the website. You are solely
                    responsible for protecting the security and confidentiality of the password and identification assigned and for restricting access
                    to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
                    You shall immediately notify Poodles Petcare of any unauthorized use of your password or identification or
                    any other breach or threatened breach of this website's security.</p>
                <p  className="frequently_asked_questions_question_container">You will be solely responsible for all access to and use of this site by anyone using this password and identification whether or
                    not such access to and use of this site (including all obligations, communications and transmissions) is actually authorized by you.
                    Poodles Petcare reserves the right to refuse service, terminate accounts, and/or cancel orders at its discretion, including, without
                    limitation, if  Poodles Petcare believes that the conduct by the customer violates applicable law or is harmful to website.</p>
                <h1>10. ANIMAL WELFARE AND PROHIBITION Of BUYING/SELLING PETS</h1>
                <p  className="frequently_asked_questions_question_container">By using this platform, you agree to abide by the principles of animal welfare and commit to not engaging in or promoting any form of animal cruelty, neglect, or mistreatment. This includes, but is not limited to, actions that cause physical harm, distress, or endangerment to animals.</p>
                <p  className="frequently_asked_questions_question_container">You expressly acknowledge and agree that buying and selling pets on this platform is strictly prohibited. This platform is dedicated to promoting responsible pet adoption and ensuring the well-being of animals. Any attempt to engage in the buying or selling of pets, or any actions that exploit animals for commercial purposes, is strictly against our policies</p>
                <p  className="frequently_asked_questions_question_container">If you are found to be involved in buying, selling, or promoting the sale of pets on this platform, we reserve the right to take immediate and appropriate action.</p>

                <h1>11. DISCLAIMER</h1>
                <p  className="frequently_asked_questions_question_container">You acknowledge and undertake that you are accessing the services on the site and transacting at your own risk and are using your best and prudent
                    judgment before entering into any transactions through Poodles Petcare. If you are dissatisfied with the Site, any Contents, or any of these Terms
                    and conditions, we would like to hear from you. However, your only legal remedy is to stop using the website. Poodles does not warrant your use of
                    the Site.</p>
                <h1>12. GOVERNING LAW, JURISDICTION AND DISPUTE RESOLUTION</h1>
                <p  className="frequently_asked_questions_question_container">Poodles Petcare controls and operates this website from its Registered Office in Jaipur,Rajasthan. These Terms of Use (and any further rules,
                    polices, or guidelines incorporated by reference) shall be governed and construed in accordance with the laws of India.</p>
                <p className="frequently_asked_questions_question_container">Any dispute arising under or relating to the terms, contents, your use of the website, or products or services purchased using the website or
                    with Poodles Petcare shall solely and to the exclusion of all other courts be subject to the jurisdiction of the appropriate Courts situated in Jaipur,
                    India alone. By using the website, you consent to the jurisdiction and venue of Jaipur courts with respect to any such dispute.</p>
                <h1>13. GRIEVANCE REDRESSAL</h1>
                <p  className="frequently_asked_questions_question_container">Any complaint or concern with regard to the Services, access, usage, content, comment or breach of the Terms of Use shall be addressed to the
                    designated Grievance Officer of Poodles Petcare. The complaint shall be registered through sending an email to the respective email ID as provided
                    below. It shall be the endeavour of Poodles Petcare to satisfactorily resolve and address the grievances at the earliest.</p>
                <p  className="frequently_asked_questions_question_container">Email - contact@poodles.in</p>
                <h1>14. ENTIRE AGREEMENT</h1>
                <p  className="frequently_asked_questions_question_container">These Terms of Use constitutes the complete agreement and sets forth the entire understanding of you and the Poodles Petcare as to the subject
                    matter of this Agreement. If any provision of this Agreement is found by any court of competent jurisdiction to be invalid or unenforceable,
                    the invalidity of such provision shall not affect the other provisions of this Agreement, and all provisions not affected by such invalidity
                    shall remain in full force and effect. The headings contained in this Agreement are for convenience of reference only and shall not affect
                    the meaning and interpretation of this Agreement.</p>

                <p  className="frequently_asked_questions_question_container">By using this platform, you acknowledge that the well-being and ethical treatment of animals are of utmost importance to us.
                    We encourage responsible behavior and compliance with these principles. Our commitment to preventing animal cruelty and ensuring
                    the safety of animals is unwavering, and we appreciate your cooperation in upholding these values.</p>


                <p  className="frequently_asked_questions_question_container">By accepting these Terms of Use, the User agrees to have fully read and understood all the terms and conditions set out hereinabove.</p>
                <a href="/allpets">Explore Pets Near You For Adoption!</a>

            </div>
        </div>
    );
}
export default TermsOfService;