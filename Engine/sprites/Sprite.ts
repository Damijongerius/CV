

export class Sprite{

    private image;
    private fileType;


    public SetImage(_image) {
        if(_image instanceof String){
            if(_image != null && _image.length > 3){
                
            }
            this.image = _image;

            
        }else{
            console.error("only accept path to file in string type");
        }
    }

    public GetImage(){
        return this.image;
    }


}