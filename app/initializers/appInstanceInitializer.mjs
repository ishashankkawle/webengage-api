import httpHandler from "../core/httpHandler.mjs";

class AppInstance
{
    constructor()
    {
        // this.resources = resources;        
        if(AppInstance.instance)
            {
                return AppInstance.instance
            }
            
        AppInstance.instance = this;
        this.http = new httpHandler();
        
    }
}

export default AppInstance;