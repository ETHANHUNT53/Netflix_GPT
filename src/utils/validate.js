export const checkValidData = (email,password,name)=>{
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";
    if(name && !isNameValid) return "Enter a valid name"

    return null;
}