import React  from "react";
function InputField({value,name,type,placeholder,onChange,className,id,required,pattern,onBlur,style,checked}){
  return(
    <>
    <input checked={checked} style={style} className = {className} id={id} pattern={pattern} required={required} value={value} name={name} type={type} placeholder={placeholder} onChange={onChange} onBlur={onBlur}></input>
    </>
  );
}

function TextField({name,type,placeholder,className,value,onChange,rows,onBlur,style}){
return(
    <textarea style={style} onBlur={onBlur} className={className} value={value} name={name} type={type} placeholder={placeholder} rows={rows} onChange={onChange}></textarea>
)
}
function FileField({name,type,accept,onChange,className,id,style}){
  return (<input style={style} name={name} type={type} multiple accept={accept} onChange={onChange} className={className} id={id}></input>);
}
export default InputField
export {TextField, FileField}