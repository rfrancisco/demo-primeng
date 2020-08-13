import { Injectable } from '@angular/core';
import { PagedResults } from './models';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Injectable()
export class TableUtilsService {

    resetDataSource<T>(tmpDataSource: T[], event: LazyLoadEvent, previousEvent: LazyLoadEvent, table: Table): T[] {
        if (!previousEvent) {
            return tmpDataSource;
        }

        // Create a copy of the previous event without the page offset
        let previousCopy = JSON.parse(JSON.stringify(previousEvent));
        previousCopy.first = 0;
        previousCopy = JSON.stringify(previousCopy);

        // Create a copy of the current event without the page offset
        let currentCopy = JSON.parse(JSON.stringify(event));
        currentCopy.first = 0;
        currentCopy = JSON.stringify(currentCopy);

        // Check if anything changed with the exception of the page
        const needsReset = previousCopy !== currentCopy;

        if (needsReset) {
            table.scrollableViewChild.clearCache();
            tmpDataSource = [];
        }

        return tmpDataSource;
    }

    updateDataSource<T>(tmpDataSource: T[], first: number, rows: number, pageData: PagedResults<T>): any[] {
        if (!tmpDataSource?.length) {
            tmpDataSource = Array.from({ length: pageData.totalRecords });
        }
        // populate vierual page of the datasource
        Array.prototype.splice.apply(tmpDataSource, [...[first, rows], ...pageData.records]);
        return tmpDataSource;
    }

}
