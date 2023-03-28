let authorization_header = null;

export function get_authorization_header(){

    return authorization_header;

}

export function set_authorization_header(header) {

    authorization_header = header;
    
}

export function make_authorization(userid, password){

    let authorization = "Bearer"+ " " + userid + " " + password;

    set_authorization_header(authorization);

}





