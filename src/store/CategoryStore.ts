import { Category } from "../model/Category";
import { observable, computed } from 'mobx'
import { db } from "../core/database";
import { CategoryConverter } from "../converters/CategoryConverter";

class CategoryStore {
    @observable _categories: ICategory[] = [];

    get Categories(): Category[] {
        return this._categories;
    }

    constructor() {
        db.child('Master/category').on('value', snap => {
            if (snap) {
                this._categories = [];
                snap.val().map((c) => {
                    this._categories.push(CategoryConverter.convert(c));
                });
            }

        });
    }
}
var store = new CategoryStore();
(<any>window).cs = store;
export default store;