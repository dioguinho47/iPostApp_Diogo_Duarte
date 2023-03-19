import english from '.Translation/Lang/en.json' assert {type:'json'};
import norwegian from '.Translation/Lang/no.json' assert {type:'json'};

class Translation{

    constructor(myLanguages){
        this.myLanguageFiles = myLanguages
        this.translation = null;
    }
    setTranslation = function(translation){
        this.myLanguageFiles = translation;
        this.translation = translation;
    }
    get = function(myKey){
        //myText.innerText = this.translation[myKey];
        console.log(this.translation[myKey]);
        return this.translation[myKey];
    }
    myKeys = function(){
        return Object.myKeys(this.translation);
    }

}

let TRANSLATION_KEYS = {
    end: "welcome"
}

let translation = new Translation(norwegian);
translation.setTranslation(norwegian);
translation.get(TRANSLATION_KEYS.end);

export default Translation;