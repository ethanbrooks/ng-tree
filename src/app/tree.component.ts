import { Component, enableProdMode } from '@angular/core';

import { DxTreeListModule, DxCheckBoxModule } from 'devextreme-angular';

import { TreeService, Employee } from './tree.service';


@Component({
    styleUrls: ['./tree.component.css'],
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    providers: [TreeService],
    preserveWhitespaces: true
})
export class TreeComponent {

    employees: Array<Employee>;
    allowDropInsideItem = true;
    allowReordering = true;
    showDragIcons = true;
    expandedRowKeys: Array<number> = [1];

    constructor(service: TreeService) {
        this.employees = service.getEmployees();
        this.onReorder = this.onReorder.bind(this);
    }

    onDragChange(e) {
        const visibleRows = e.component.getVisibleRows(),
            sourceNode = e.component.getNodeByKey(e.itemData.ID);
        let targetNode = visibleRows[e.toIndex].node;

        while (targetNode && targetNode.data) {
            if (targetNode.data.ID === sourceNode.data.ID) {
                e.cancel = true;
                break;
            }
            targetNode = targetNode.parent;
        }
    }

    onReorder(e) {
        const visibleRows =  e.component.getVisibleRows(),
            sourceData = e.itemData,
            targetData = visibleRows[e.toIndex].data;

        if (e.dropInsideItem) {
            e.itemData.Head_ID = targetData.ID;
            e.component.refresh();
        } else {
            const sourceIndex = this.employees.indexOf(sourceData);
            let targetIndex = this.employees.indexOf(targetData);

            if (sourceData.Head_ID !== targetData.Head_ID) {
                sourceData.Head_ID = targetData.Head_ID;
                if (e.toIndex > e.fromIndex) {
                    targetIndex++;
                }
            }

            this.employees.splice(sourceIndex, 1);
            this.employees.splice(targetIndex, 0, sourceData);
        }
    }
}
