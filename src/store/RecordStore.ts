import { observable, computed } from 'mobx'
import { db } from "../core/database";
import { Record, RecordWithoutKey } from '../model/Record';
import { RecordConverter } from '../converters/RecordConverter';

class RecordStore {
    @observable _records: Record[] = [];
    @observable _totalRecordsByCategory: Record[] = [];
    _totalRecords: Record[] = [];
    _recordFilter: string = '';
    _category: string = '';

    get Records(): Record[] {
        return this._records;
    }

    @observable
    private _NewRecord: Record;
    public get NewRecord(): Record {
        return this._NewRecord;
    }
    public set NewRecord(v: Record) {
        this._NewRecord = v;
    }

    /**
     *
     */
    constructor() {
        this._NewRecord = new Record();
        this.getWholeRecords();
    }

    public set Category(category: string) {
        this._category = category;
        db.child('Records').orderByChild('category').equalTo(category).on('value', snap => {
            if (snap) {
                this._totalRecordsByCategory = [];
                if (snap.val()) {
                    Object.keys(snap.val()).map(r => {
                        console.log(snap.val()[r], r);
                        this._totalRecordsByCategory.push(RecordConverter.convert(snap.val()[r], r));
                    });
                }
                this.setFilteredRecords(this._recordFilter);
            }
        })
    }
    public get Category(): string {
        return this._category;
    }

    setFilteredRecords(filter: string): void {
        if (filter && filter.trim() != '') {
            if (this.Category.trim() == '') {
                this._records = this._totalRecords.filter(f => {
                    return f.Field1.includes(filter) ||
                        f.Field2.includes(filter) ||
                        f.Field3.includes(filter) ||
                        f.Field4.includes(filter);
                });
            } else {
                this._records = this._totalRecordsByCategory.filter(f => {
                    return f.Field1.includes(filter) ||
                        f.Field2.includes(filter) ||
                        f.Field3.includes(filter) ||
                        f.Field4.includes(filter);
                });
            }
        } else {
            this._records = this._totalRecordsByCategory.slice();
        }
    }

    getWholeRecords():void {
        db.child('Records').orderByChild('category').on('value', snap => {
            if (snap) {
                this._totalRecords = [];
                if (snap.val()) {
                    Object.keys(snap.val()).map(r => {
                        console.log(snap.val()[r], r);
                        this._totalRecords.push(RecordConverter.convert(snap.val()[r], r));
                    });
                }
                this.setFilteredRecords(this._recordFilter);
            }
        })
    }

    public set RecordFilter(filter: string) {
        this._recordFilter = filter;
        this.setFilteredRecords(filter);
    }

    public SaveOrUpdateRecord = () => {
        if (this.NewRecord) {
            console.log(this.NewRecord);
            if (this.NewRecord.key.trim() != '') {
                db.child('Records/' + this.NewRecord.key).set(new RecordWithoutKey(this.NewRecord));
            }
            else {
                db.child('Records').push(new RecordWithoutKey(this.NewRecord));
            }
        }
    }

}
var store = new RecordStore();
(<any>window).rs = store;
export default store;