import yaml from 'js-yaml';

export default function(data:string):string {   
    try {
        return JSON.stringify(yaml.load(data), null, 4);
    } catch (e) {
        console.log(e);
        return "";
    }    
};