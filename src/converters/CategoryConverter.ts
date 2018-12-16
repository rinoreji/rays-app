import { Category } from "../model/Category";

export class CategoryConverter {
    public static convert(obj:any):ICategory {
        let cat = new Category();
        if(obj){
            cat.name = obj.name;
            cat.field1 = { name:'Field1', value : obj.Field1 };
            cat.field2 = { name:'Field2', value : obj.Field2 };
            cat.field3 = { name:'Field3', value : obj.Field3 };
            cat.field4 = { name:'Field4', value : obj.Field4 };
        }
        return cat;
    }
}