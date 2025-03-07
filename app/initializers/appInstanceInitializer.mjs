import httpHandler from "../core/httpHandler.mjs";
import { resources } from "../public/resources.mjs";

class AppInstance
{
    constructor()
    {
        this.resources = resources;        
        if(AppInstance.instance)
            {
                return AppInstance.instance
            }
            
        AppInstance.instance = this;
        this.http = new httpHandler();
        
    }
}

export default AppInstance;