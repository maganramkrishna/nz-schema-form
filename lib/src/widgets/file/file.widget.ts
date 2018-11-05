import { Component, OnInit, OnDestroy } from '@angular/core';
import { UploadFile } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ControlWidget } from '../../widget';

@Component({
    selector: 'nz-sf-file-widget',
    template: `
    <nz-form-label *ngIf="schema.title" [nzSpan]="schema.span_label" [nzRequired]="required" [nzFor]="id">
        {{ schema.title }}
        <nz-tooltip *ngIf="showDescription && description" [nzTitle]="description">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
        </nz-tooltip>
    </nz-form-label>
    <nz-form-control [nzSpan]="schema.span_control" [nzOffset]="schema.offset_control">
        <nz-upload
            [nzFileList]="fileList"
            (nzFileListChange)="change()"
            [nzDisabled]="disabled"
            [nzAction]="action"
            [nzAccept]="accept"
            [nzLimit]="limit"
            [nzSize]="fsize"
            [nzFileType]="fileType"
            [nzHeaders]="headers"
            [nzListType]="listType"
            [nzMultiple]="multiple"
            [nzName]="argName"
            [nzShowUploadList]="showUploadList"
            [nzWithCredentials]="withCredentials"
            [nzBeforeUpload]="beforeUpload">
            <button nz-button>
                <i class="anticon anticon-upload"></i><span [innerHTML]="buttonText"></span>
            </button>
        </nz-upload>
        <nz-form-extra *ngIf="extra" [innerHTML]="extra"></nz-form-extra>
        <nz-form-explain *ngIf="!onlyVisual && hasError">{{errorMessage}}</nz-form-explain>
    </nz-form-control>`
})
export class FileWidget extends ControlWidget implements OnInit, OnDestroy {

    fileList: UploadFile[] = [];
    buttonText: string;
    action: string;
    accept: string;
    limit = 0;
    fsize = 0;
    fileType: string;
    headers: {};
    listType: string;
    multiple: boolean;
    argName: string;
    showUploadList: boolean;
    withCredentials: boolean;
    private value$: Subscription;

    ngOnInit() {
        this.buttonText = this.widgetData.buttonText || '点击上传';
        this.action = this.widgetData.action || '';
        this.accept = this.widgetData.accept || '';
        this.limit = this.widgetData.limit == null ? 0 : +this.widgetData.limit;
        this.fsize = this.widgetData.size == null ? 0 : +this.widgetData.size;
        this.fileType = this.widgetData.fileType || '';
        this.headers = this.widgetData.headers || null;
        this.listType = this.widgetData.listType || 'text';
        this.multiple = this.widgetData.multiple || false;
        this.argName = this.widgetData.argName || 'file';
        this.showUploadList = this.widgetData.showUploadList || true;
        this.withCredentials = this.widgetData.withCredentials || false;

        this.value$ = this.formProperty.valueChanges.subscribe((val) => {
            if (typeof val === 'string') this.fileList = [];
        });
    }

    change() {
        this.fileList = this.fileList.filter(w => !w.status || w.status !== 'removed');
        this.formProperty.setValue(this.fileList, false);
    }

    beforeUpload = (file: UploadFile): boolean => {
        this.fileList.push(file);
        this.change();
        return false;
    }

    ngOnDestroy(): void {
        if (this.value$) this.value$.unsubscribe();
    }
}
