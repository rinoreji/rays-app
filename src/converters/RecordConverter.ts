import { Record } from "../model/Record";

export class RecordConverter {
    public static convert(obj: any, key:string): Record {
        let rec = new Record();
        if(obj){
            rec.category = obj.category;
            rec.Field1 = obj.Field1;
            rec.Field2 = obj.Field2;
            rec.Field3 = obj.Field3;
            rec.Field4 = obj.Field4;
            rec.key = key;
        }
        return rec;
    }
}