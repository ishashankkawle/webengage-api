import CsvController from "../controller/csvController.mjs";
import HttpHandler from "../core/httpHandler.mjs";
import Util from "../core/utils.mjs";
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
        this.util = new Util();
        this.http = new HttpHandler();
        this.csvHandler = new CsvController();
    }
}

export default AppInstance;