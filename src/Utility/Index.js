export const isLogin=()=>{
    let user = localStorage.getItem('user')
    if(user){
        return true;
    }else{
         return false;
    }
}

const arr = undefined;

// ⛔️ TypeError: Cannot read properties of undefined (reading 'length')
arr.length;
