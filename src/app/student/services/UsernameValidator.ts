import { FormControl } from '@angular/forms';

export class UsernameValidator{
    static validUsername(fc:FormControl){
        if(fc.value === "admin123" || fc.value === "nikhil"){
        return ({validUsername: true})
    }
    else{
        return null;
    }
    }
}

