import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'imprint-dialog',
    templateUrl: 'imprintDialog.component.html',
})
export class ImprintDialog {

    constructor(public dialogRef: MatDialogRef<ImprintDialog>) {}

    onClose(): void {
        this.dialogRef.close();
    }

}