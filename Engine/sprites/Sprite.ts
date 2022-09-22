import { ImageExtensions } from './imageExtesions';
export class Sprite{


    private imageInfo = {
        fileType: "",
        dots: 0,
        Path: ""
      };

    public SetImage(_imagePath) {
        if(_imagePath instanceof String){

            _imagePath.trim();
            if(_imagePath != null && _imagePath.length > 3){
                
                _imagePath.startsWith(".");

            }
            this.imageInfo.Path = _imagePath.toString();


            
        }else{
            console.error("only accept path to file in string type");
        }
    }

    private CheckPath(_path){
        this.imageInfo.dots = this.HasDots(this.imageInfo.Path);

        const Dirs = this.imageInfo.Path.split("/");
        const newDirs = _path.split("/");

        if(this.imageInfo.dots == 1){

            this.imageInfo.Path.replace(Dirs[Dirs.length - 1], newDirs[newDirs.length - 1]);
        }
        if(this.imageInfo.dots == 2){

            Dirs[Dirs.length - 2] = newDirs[newDirs.length - 1];
            Dirs.pop();
        }
    }

    private checkFileExist(urlToFile) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', urlToFile, false);
        xhr.send();
         
        if (xhr.status == 404) {
            return false;
        } else {
            return true;
        }
    }

    private HasDots(_imagePath){
        if(_imagePath.startsWith(".")){
            if(_imagePath.startsWith("..")){
                return 2;
            }
            return 1;
        }
        return 0;
    }

    private ToJPEG(){

    }

    public GetImage(){
        return this.imageInfo.Path;
    }


}